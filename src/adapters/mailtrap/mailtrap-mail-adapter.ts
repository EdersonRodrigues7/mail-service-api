import { MailtrapClient } from "mailtrap";
import { MailAdapter, SendMailData } from '../mail-adapter';

// Production
const TOKEN = "12c25af180481d583f106ad65a8e6bd5";
const SENDER_EMAIL = "ederson@d-dev.dev";

const client = new MailtrapClient({ endpoint: "https://send.api.mailtrap.io/", token: TOKEN });

const sender = { name: "D-Dev Mail Service", email: SENDER_EMAIL };

export class MailtrapMailAdapter implements MailAdapter {
    async sendMail ({ destination, subject, body }: SendMailData){
        client.send({
            from: sender,
            to: [{email: destination.email, name: destination.name}],
            subject: subject,
            html: body
        })
        .then(res => console.log(res))
        .catch(err => {
            console.error(err); 
            throw new Error("Error sending mail!");
        });
    };
}