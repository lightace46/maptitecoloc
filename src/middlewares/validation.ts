import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.log(err.message);
    if (!err.isEmpty) {
        const statusCode = err.statusCode || 400; // Default to 400 if statusCode is not provided
        res.status(statusCode).json({ message: err.message, errors: err.errors });
    } else {
        next();
    }
};