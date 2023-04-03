export interface SendMailData {
    destination: string;
    subject: string;
    body: string;
}
  
export interface MailAdapter {
    sendMail: (data: SendMailData) => Promise<void>;
}