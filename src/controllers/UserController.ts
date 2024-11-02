import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";

export class LogController {
    async post(req: Request, res: Response, next: NextFunction) {
        try {
            
        } catch (error) {
            return next(new Error('Error on post User'));
        }
    }  
}