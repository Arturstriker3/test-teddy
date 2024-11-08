export class ApiError extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class serviceUnavailable extends ApiError {
    constructor(message: string) {
        super(message, 503);
    }
}

export class ConflictError extends ApiError {
    constructor(message: string) {
        super(message, 409);
    }
}