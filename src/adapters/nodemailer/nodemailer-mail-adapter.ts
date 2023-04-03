import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

// Development
const transport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: parseInt(process.env.NODEMAILER_PORT as string, 10),
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

// Production
// const transport = nodemailer.createTransport({
//     host: process.env.MAILTRAP_HOST,
//     port: parseInt(process.env.MAILTRAP_PORT as string, 10),
//     auth: {
//         user: process.env.MAILTRAP_USER,
//         pass: process.env.MAILTRAP_PASSWORD
//     },
//     requireTLS: true
// });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ destination, subject, body }: SendMailData) {
        const message = {
            from: 'D-Dev Mail Service <ederson@d-dev.dev>',
            to: destination,
            subject,
            html: body 
        };

        transport.sendMail(message, function(err){
            if (err) {throw new Error(err.message);}
        });
        
    }
}