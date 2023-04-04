import { MailtrapClient } from "mailtrap";
import { MailAdapter, SendMailData } from '../mail-adapter';

// Production
const TOKEN = process.env.MAILTRAP_PASSWORD;
const SENDER_EMAIL = "ederson@d-dev.dev";

const client = new MailtrapClient({ endpoint: process.env.MAILTRAP_HOST, token: TOKEN });

const sender = { name: "D-Dev Mail Service", email: SENDER_EMAIL };

export class MailtrapMailAdapter implements MailAdapter {
    async sendMail ({ destination, subject, body }: SendMailData){
        client.send({
            from: sender,
            to: [{name: destination.name, email: destination.email}],
            subject: subject,
            html: body
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    };
}