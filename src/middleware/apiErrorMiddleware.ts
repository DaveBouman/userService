import { Request, Response, NextFunction } from "express"
import Logger from "../logger/logger"
/* eslint-disable */
const apiErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

    Logger.error(`${error.message}`);
    res.status(500).json({
        message: 'Something went wrong'
    });
}


export const useErrorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default apiErrorHandler