import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { NodemailerMailAdapter } from '@/src/adapters/nodemailer/nodemailer-mail-adapter';
import { BudgetController } from '@/src/controllers/budget-controller';

// type Data = {
//   ok?: string,
//   error?: string
// }

const cors = Cors({
  origin: "https://delta-10-landing-page.vercel.app",
  methods: ['POST', 'GET', 'HEAD', 'OPTIONS'],
  allowedHeaders: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type",
  optionsSuccessStatus: 200
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'POST'){
    await runMiddleware(req, res, cors)
    console.log(req.body);
    try {
        const nodemailerMailAdapter = new NodemailerMailAdapter();
        const budgetController = new BudgetController(req.body, nodemailerMailAdapter);
        await budgetController.execute();
        return res.status(201).send({ok: "Orçamento solicitado com sucesso!"});
    } catch (error: any) {
        return res.status(500).send({error: error.message});
    } 
  } else if (req.method === 'OPTIONS'){
    console.log("Options method");
    return res.status(200).send({ok: "Allowed"});
  }
  console.log("General context");
  return res.status(200).send({ok: "Allowed"});
}