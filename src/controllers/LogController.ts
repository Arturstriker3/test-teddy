import { NextFunction, Request, Response } from "express";
import { logRepository } from '../repositories/logRepositories';
import { Log, Severity } from '../entities/Log';
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { Address4, Address6 } from 'ip-address';
import { ObjectId } from 'mongodb';
import clientPromise from '../mongoClient';

export class LogController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const allowedFields = ['ip', 'user', 'description', 'geolocation', 'navMetadata', 'extraMetaData', 'severity'];
            const receivedFields = Object.keys(req.body);
    
            const unexpectedFields = receivedFields.filter(field => !allowedFields.includes(field));
            if (unexpectedFields.length > 0) {
                return next(new BadRequestError(`Unexpected fields: ${unexpectedFields.join(', ')}`));
            }
    
            const { ip, user, description, geolocation, navMetadata, extraMetaData, severity } = req.body;
    
            if (!ip || typeof ip !== 'string' || 
                (!Address4.isValid(ip) && !Address6.isValid(ip))) {
                return next(new BadRequestError('The IP is mandatory and must be a valid IPv4 or IPv6 address.'));
            }
    
            if (user && (typeof user !== 'string')) {
                return next(new BadRequestError('The USER must be a valid string.'));
            }
    
            if (!description || typeof description !== 'string') {
                return next(new BadRequestError('The DESCRIPTION is mandatory and must be a valid string.'));
            }
    
            if (geolocation && 
                (typeof geolocation !== 'object' || 
                (geolocation.latitude !== undefined && typeof geolocation.latitude !== 'number') || 
                (geolocation.longitude !== undefined && typeof geolocation.longitude !== 'number'))) {
                return next(new BadRequestError('The GEOLOCATION must be a valid object and must contain valid latitude and longitude if provided.'));
            }
    
            if (navMetadata && 
                (typeof navMetadata !== 'object' ||
                (navMetadata.userAgent !== undefined && typeof navMetadata.userAgent !== 'string') || 
                (navMetadata.browser !== undefined && typeof navMetadata.browser !== 'string') || 
                (navMetadata.os !== undefined && typeof navMetadata.os !== 'string'))) {
                return next(new BadRequestError('The NAVMETADATA must be a valid object and must contain userAgent, browser, and OS as strings if provided.'));
            }
    
            if (extraMetaData && (typeof extraMetaData !== 'string')) {
                return next(new BadRequestError('The EXTRAMETADATA must be a valid string.'));
            }
    
            if (severity && !Object.values(Severity).includes(severity)) {
                return next(new BadRequestError('The SEVERITY is invalid. Possible values are: low | medium | high | critical.'));
            }
    
            const newLog = new Log();
            newLog.ip = ip;
            newLog.user = user;
            newLog.description = description;
            newLog.geolocation = geolocation;
            newLog.navMetadata = navMetadata;
            newLog.extraMetaData = extraMetaData;
            newLog.timestampUTC = new Date();
            newLog.severity = severity || Severity.MEDIUM;
    
            await logRepository.save(newLog);
    
            res.status(201).json(newLog);
        } catch (error) {
            return next(new Error('Error creating the log'));
        }
    }

    async getOneLogById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
    
            let objectId: ObjectId;
            try {
                objectId = new ObjectId(id);
            } catch (err) {
                return next(new BadRequestError('Invalid log ID format.'));
            }
        
            const log = await logRepository.findOne({ where: { _id: objectId } });
        
            if (!log) {
                return next(new NotFoundError('Log not found'));
            }
        
            return res.status(200).json(log);   
        } catch (error) {
            return next(new Error('Error searching the log'));
        }
    }

    async getPaginatedLogsByBody(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string);

            if (isNaN(page) || page <= 0) {
                return next(new BadRequestError('Invalid page number'));
            }

            if (isNaN(limit) || limit <= 0) {
                return next(new BadRequestError('Invalid limit number'));
            }

            const [log, totalItems] = await logRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });

            const totalPages = Math.ceil(totalItems / limit);

            return res.status(200).json({
                totalItems,
                currentPage: page,
                totalPages,
                logs: log
            });
        } catch (error) {
            return next(new Error('Error searching the logs'));
        }
    }

    async getPaginatedLogsByHeader(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string);
            const limit = parseInt(req.query.limit as string);
        
            if (isNaN(page) || page <= 0) {
                return next(new BadRequestError('Invalid page number'));
            }
        
            if (isNaN(limit) || limit <= 0) {
                return next(new BadRequestError('Invalid limit number'));
            }
        
            const [logs, totalItems] = await logRepository.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });
    
            const totalPages = Math.ceil(totalItems / limit);
    
            res.setHeader('X-Total-Items', totalItems.toString());
            res.setHeader('X-Current-Page', page.toString());
            res.setHeader('X-Total-Pages', totalPages.toString());
    
            return res.status(200).json({
                logs
            });   
        } catch (error) {
            return next(new Error('Error searching the logs'));
        }
    }

    async getLogsByPeriodBody(req: Request, res: Response, next: NextFunction) {
        try {
            const { startDate, endDate } = req.query;
            
            if (!startDate || !endDate) {
                return next(new BadRequestError('Both startDate and endDate are required.'));
            }
    
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
    
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return next(new BadRequestError('Invalid date format. Dates must be valid ISO strings.'));
            }
    
            if (start > end) {
                return next(new BadRequestError('startDate cannot be greater than endDate.'));
            }
    
            const limit = Math.max(parseInt(req.query.limit as string, 10) || 10, 1);
            const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);
            const skip = (page - 1) * limit;
    
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection('logs');
    
            const [logs, totalItems] = await Promise.all([
                collection.find({ timestampUTC: { $gte: start, $lte: end } })
                    .skip(skip)
                    .limit(limit)
                    .toArray(),
                collection.countDocuments({ timestampUTC: { $gte: start, $lte: end } })
            ]);

            if (totalItems == 0) {
                return next(new NotFoundError('No logs found with this period'));
            }
    
            const totalPages = Math.ceil(totalItems / limit);
    
            return res.status(200).json({
                totalItems,
                totalPages,
                currentPage: page,
                logs
            });
    
        } catch (error) {
            return next(new Error('Error searching for the logs period'));
        }
    }

    async getLogsByPeriodHeader(req: Request, res: Response, next: NextFunction) {
        try {
            const { startDate, endDate } = req.query;
            
            if (!startDate || !endDate) {
                return next(new BadRequestError('Both startDate and endDate are required.'));
            }
    
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
    
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return next(new BadRequestError('Invalid date format. Dates must be valid ISO strings.'));
            }
    
            if (start > end) {
                return next(new BadRequestError('startDate cannot be greater than endDate.'));
            }
    
            const limit = Math.max(parseInt(req.query.limit as string, 10) || 10, 1);
            const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);
            const skip = (page - 1) * limit;
    
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection('logs');
    
            const [logs, totalItems] = await Promise.all([
                collection.find({ timestampUTC: { $gte: start, $lte: end } })
                    .skip(skip)
                    .limit(limit)
                    .toArray(),
                collection.countDocuments({ timestampUTC: { $gte: start, $lte: end } })
            ]);

            if (totalItems == 0) {
                return next(new NotFoundError('No logs found with this period'));
            }
    
            const totalPages = Math.ceil(totalItems / limit);
    
            res.setHeader('X-Total-Items', totalItems.toString());
            res.setHeader('X-Current-Page', page.toString());
            res.setHeader('X-Total-Pages', totalPages.toString());

            return res.status(200).json({
                logs
            });

        } catch (error) {
            return next(new Error('Error searching for the logs period'));
        }
    }

    async getLogByParameter(req: Request, res: Response, next: NextFunction) {
        try {
            const allowedParams = ['ip', 'user', 'description', 'page', 'limit'];
            const receivedParams = Object.keys(req.query);

            const unexpectedParams = receivedParams.filter(param => !allowedParams.includes(param));
            if (unexpectedParams.length > 0) {
                return next(new BadRequestError(`Unexpected parameters: ${unexpectedParams.join(', ')}. Only the following parameters are accepted: ${allowedParams.join(', ')}.`));
            }

            const { ip, user, description, page: pageQuery, limit: limitQuery } = req.query;
            const page = Math.max(parseInt(pageQuery as string, 10) || 1, 1);
            const limit = Math.max(parseInt(limitQuery as string, 10) || 10, 1);
    
            if (ip && typeof ip !== 'string') {
                return next(new BadRequestError('The IP must be a valid string.'));
            }
    
            if (user && typeof user !== 'string') {
                return next(new BadRequestError('The USER must be a valid string.'));
            }
    
            if (description && typeof description !== 'string') {
                return next(new BadRequestError('The DESCRIPTION must be a valid string.'));
            }
    
            const criteria: any = {};
            
            if (ip) {
                if (!Address4.isValid(ip) && !Address6.isValid(ip)) {
                    return next(new BadRequestError('The IP address is invalid.'));
                }
                criteria.ip = ip;
            }
            
            if (user) criteria.user = user;
            if (description) criteria.description = description;
    
            const [logs, totalItems] = await logRepository.findAndCount({
                where: criteria,
                skip: (page - 1) * limit,
                take: limit
            });

            if (totalItems == 0) {
                return next(new NotFoundError('No logs found with this criteria'));
            }
    
            const totalPages = Math.ceil(totalItems / limit);
    
            res.status(200).json({
                totalItems,
                totalPages,
                currentPage: page,
                logs
            });
        } catch (error) {
            return next(new Error('Error searching for the logs parameters'));
        }
    }

    async getLogsByDynamicQuery(req: Request, res: Response, next: NextFunction) {
        try {
            const { paginated, startDate, endDate, ip, user, description } = req.query;
    
            if (!paginated || (paginated !== 'body' && paginated !== 'header')) {
                return next(new BadRequestError('The PAGINATED parameter is required and must be either "body" or "header".'));
            }
    
            if ((startDate && !endDate) || (!startDate && endDate)) {
                return next(new BadRequestError('Both "startDate" and "endDate" are required for period-based search.'));
            }
    
            const page = Math.max(parseInt(req.query.page as string, 10) || 1, 1);
            const limit = Math.max(parseInt(req.query.limit as string, 10) || 10, 1);
            const skip = (page - 1) * limit;
    
            const criteria: any = {};

            if (startDate && endDate) {
                const start = new Date(startDate as string);
                const end = new Date(endDate as string);
    
                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                    return next(new BadRequestError('Invalid date format. Dates must be valid ISO strings.'));
                }
    
                if (start > end) {
                    return next(new BadRequestError('startDate cannot be greater than endDate.'));
                }
    
                criteria.timestampUTC = { $gte: start, $lte: end };
            }
    
            if (ip) {
                const ipValue = ip as string;
                if (typeof ipValue !== 'string' || (!Address4.isValid(ipValue) && !Address6.isValid(ipValue))) {
                    return next(new BadRequestError('The IP must be a valid IPv4 or IPv6 address.'));
                }
                criteria.ip = ipValue;
            }
    
            if (user && (typeof user !== 'string')) {
                return next(new BadRequestError('The USER must be a valid string.'));
            }
            if (user) {
                criteria.user = user;
            }
    
            if (description && (typeof description !== 'string')) {
                return next(new BadRequestError('The description must be a valid string.'));
            }
            if (description) {
                criteria.description = description;
            }
    
            const client = await clientPromise;
            const db = client.db();
            const collection = db.collection('logs');
    
            const [logs, totalItems] = await Promise.all([
                collection.find(criteria)
                    .skip(skip)
                    .limit(limit)
                    .toArray(),
                collection.countDocuments(criteria)
            ]);
    
            if (totalItems === 0) {
                return next(new NotFoundError('No logs found with the given criteria.'));
            }
    
            const totalPages = Math.ceil(totalItems / limit);
    
            if (paginated === 'header') {
                res.setHeader('X-Total-Items', totalItems.toString());
                res.setHeader('X-Current-Page', page.toString());
                res.setHeader('X-Total-Pages', totalPages.toString());
    
                return res.status(200).json({ logs });
            } else {
                return res.status(200).json({
                    totalItems,
                    totalPages,
                    currentPage: page,
                    logs
                });
            }
        } catch (error) {
            return next(new Error('Error searching for logs with dynamic query'));
        }
    }    
}