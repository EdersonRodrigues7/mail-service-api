export interface SendMailData {
    destination: {
        name?: string | undefined;
        email: string;
    };
    subject: string;
    body: string;
}
  
export interface MailAdapter {
    sendMail: (data: SendMailData) => Promise<void>;
}