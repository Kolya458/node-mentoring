import jwt from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
import config from '../../config';


export default async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authorization;
    jwt.verify(token, config.jwtSecret, (err: Error, decoded: object) => {
        if (err) {
            res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            req.body.userId = decoded;
            next();
        }
    });
};
