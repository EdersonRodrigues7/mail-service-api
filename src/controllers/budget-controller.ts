import { MailAdapter } from '../adapters/mail-adapter';

interface BudgetRequest {
    destination: {
        name?: string | undefined;
        email: string;
    };
    name: string;
    email: string;
    product: string;
    observation?: string;
}

export class BudgetController {
    constructor(private request: BudgetRequest, private adapter: MailAdapter){}
    async execute(){
        if (!this.validate(this.request)) {
            throw new Error("Requisição inválida! Por favor preencha todos os campos obrigatórios.");
        };
        console.log("Entrou no Budget Controller");
        try{
            await this.adapter.sendMail({
                destination: this.request.destination,
                subject: `Pedido de Orçamento: ${this.request.product}`,
                body: [
                    `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                    `<p>Nome do Cliente: ${this.request.name}</p>`,
                    `<p>E-mail do Cliente: ${this.request.email}</p>`,
                    `<p>Observação: ${this.request.observation}</p>`,
                    `</div>`
                  ].join('\n')
            });
        } catch(error){
            throw new Error();
        }
        
    }

    validate(request: BudgetRequest): boolean {
        if(!request.name || !request.email || !request.product){
            return false;
        }
        return true;
    }
}