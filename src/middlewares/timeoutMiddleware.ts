import { Request, Response, NextFunction } from 'express';
import { serviceUnavailable } from "../helpers/api-errors";

const timeoutMiddleware = (_req: Request, res: Response, next: NextFunction) => {
    const TIMEOUT_MS = 20000;

    res.setTimeout(TIMEOUT_MS, () => {
        const message = 'Service unavailable. The response timeout has been exceeded.'
        return next(new serviceUnavailable(message));
    });

    next();
};

export default timeoutMiddleware;
