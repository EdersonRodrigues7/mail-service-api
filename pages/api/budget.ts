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
    console.log("Arrived in POST request");
    try {
        const nodemailerMailAdapter = new NodemailerMailAdapter();
        const budgetController = new BudgetController(req.body, nodemailerMailAdapter);
        await budgetController.execute();
        return res.status(201).send({ok: "Orçamento solicitado com sucesso!"});
    } catch (error: any) {
        return res.status(500).send({error: error.message});
    } 
  } else if(req.method === 'OPTIONS'){
    console.log("Arrived in OPTIONS request");
    return res.status(200);
  }
  res.status(405);
}