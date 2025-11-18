import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user: User = req.user; // Assuming user is set in req by auth middleware

        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({
                message: 'Access denied. Insufficient permissions.'
            });
        }

        next();
    };
};