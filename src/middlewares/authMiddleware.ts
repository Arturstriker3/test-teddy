import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepositories";
import jwt from 'jsonwebtoken';

type jwtPayload = {
    id: number;
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Not Authorized' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as jwtPayload;

        const user = await userRepository.findOneBy({ id });

        if (!user) {
            return res.status(401).json({ message: 'Not Authorized' });
        }

        const { password: _, ...loggedUser } = user;
        req.user = loggedUser;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};
