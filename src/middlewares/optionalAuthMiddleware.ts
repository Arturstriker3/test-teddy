import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepositories";
import jwt from "jsonwebtoken";

export const optionalAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next();
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as { id: number };

        const user = await userRepository.findOneBy({ id });

        if (user) {
            req.user = user;
        }

        next();
    } catch (error) {
        next();
    }
};
