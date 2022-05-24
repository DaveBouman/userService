import { Request, Response } from 'express';
import SendGridService from '../services/sendGridService';
import SendGridMessage from '../entities/sendGrid';

export default class SendGridController {

    private sendGridService = new SendGridService();

    async sendEmail(req: Request, res: Response) {
        const sendGridMessage: SendGridMessage = req.body;

        const result = this.sendGridService.sendEmail(sendGridMessage);

        return res.status(200).json({
            message: 'succesful',
            entity: result
        })
    }
}
