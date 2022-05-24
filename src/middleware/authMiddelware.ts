import { Request, Response, NextFunction } from 'express';
import Logger from '../logger/logger';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user) {
            Logger.info('succesfull authentication', req.user)
            next();
        }
        res.status(404).send("not authentication")
    } catch (error) {
        Logger.error(error);
        res.status(404).send("unsuccesfull authentication")
    }
}