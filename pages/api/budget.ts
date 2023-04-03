import type { NextApiRequest, NextApiResponse } from 'next';
import { NodemailerMailAdapter } from '@/src/adapters/nodemailer/nodemailer-mail-adapter';
import { BudgetController } from '@/src/controllers/budget-controller';

type Data = {
  ok?: string,
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'POST'){
    try {
        const nodemailerMailAdapter = new NodemailerMailAdapter();
        const budgetController = new BudgetController(req.body, nodemailerMailAdapter);
        await budgetController.execute();
        return res.status(201).send({ok: "Orçamento solicitado com sucesso!"});
    } catch (error: any) {
        return res.status(500).send({error: error.message});
    } 
  } else if(req.method === 'OPTIONS'){

  }
  res.status(405);
}