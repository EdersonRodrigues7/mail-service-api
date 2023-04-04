import { MailtrapClient } from "mailtrap";
import { MailAdapter, SendMailData } from '../mail-adapter';

// Production
const TOKEN = process.env.MAILTRAP_PASSWORD || "";
const SENDER_EMAIL = "ederson@d-dev.dev";

const client = new MailtrapClient({ endpoint: "https://send.api.mailtrap.io/", token: TOKEN });

const sender = { name: "D-Dev Mail Service", email: SENDER_EMAIL };

export class MailtrapMailAdapter implements MailAdapter {
    async sendMail ({ destination, subject, body }: SendMailData){
        console.log("sending email...");
        client.send({
            from: sender,
            to: [{email: destination.email, name: destination.name}],
            subject: subject,
            html: body,
            headers: {'X-Message-Source': SENDER_EMAIL}
        })
        .then(res => {
            console.log(res);
            console.log("Email sent");
        })
        .catch(err => {
            console.error(err); 
            throw new Error("Error sending mail!");
        });
    };
}