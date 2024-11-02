import { NextFunction, Request, Response } from "express"
import { userRepository } from "../repositories/userRepositories";
import { UnauthorizedError } from "../helpers/api-errors";
import jwt from 'jsonwebtoken';

type jwtPayload = {
    id: number;
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
        const { authorization } = req.headers

        if (!authorization) {
            throw new UnauthorizedError('Not Authorized');
        }

        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, process.env.JWT_SECRET ?? '') as jwtPayload;

        const user = await userRepository.findOneBy({ id });

        if (!user) {
            throw new UnauthorizedError('Not Authorized');
        }

        const {password: _, ...loggedUser} = user;

        req.user = loggedUser;

        next();
}