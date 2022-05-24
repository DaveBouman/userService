import sendGrid from '@sendgrid/mail';
import Logger from '../logger/logger';
import SendGridMessage from '../entities/sendGrid';

class SendGridService {

    constructor() {
        sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
    }

    sendEmail = async (sendGridMessage: SendGridMessage) => {
        sendGrid.send(sendGridMessage)
            .then(result => {
                return result;
            }, error => {
                Logger.error(error);
            });
    }
}

export default SendGridService