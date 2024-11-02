import { NextFunction, Request, Response } from "express";
import { urlRepositories } from "../repositories/urlRepositories";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { zodValidationError } from "../helpers/zodValidationError";
import { IUrlPost } from "../interfaces";
import { generateShortUrl } from "../helpers/generateShortUrl";
import "dotenv/config";

const BASE_URL =
    process.env.NODE_ENV === "production"
        ? `${process.env.SERVER_URL}:${process.env.PORT}`
        : `http://localhost:${process.env.PORT || "3000"}`;

export class UrlController {
    async post(req: Request, res: Response, next: NextFunction) {
        const urlSchema = z
            .object({
                url: z.string().url("Invalid url format"),
            })
            .strict();
    
        try {
            const urlData: IUrlPost = urlSchema.parse(req.body);
            const { url } = urlData;

            let shortCode;
            let urlExists;

            do {
                shortCode = generateShortUrl();
                urlExists = await urlRepositories.findOneBy({ shortUrl: shortCode });
            } while (urlExists);

            const user = req.user;

            const newUrl = urlRepositories.create({
                originalUrl: url,
                shortUrl: shortCode,
                user: req.user ? req.user : undefined,
            });
    
            await urlRepositories.save(newUrl);

            const shortUrlFull = `${BASE_URL}/${newUrl.shortUrl}`;
    
            const responseUrl = {
                url: shortUrlFull,
                createdAt: newUrl.createdAt,
                ...(user && { userId: user.id }),
            };
    
            return res.status(201).json(responseUrl);
        } catch (error) {
            const validationError = zodValidationError(error);
            if (validationError) {
                return res.status(400).json(validationError);
            }
            return next(new Error("Failed to create url"));
        }
    }

    async redirect(req: Request, res: Response, next: NextFunction) {
        const { shortUrl } = req.params;

        try {
            const urlRecord = await urlRepositories.findOneBy({ shortUrl });

            if (!urlRecord) {
                throw new NotFoundError("URL not found");
            }

            urlRecord.clickCount += 1;
            await urlRepositories.save(urlRecord);

            return res.redirect(urlRecord.originalUrl);
        } catch (error) {
            return next(new Error("Failed to redirect to url"));
        }
    }
}