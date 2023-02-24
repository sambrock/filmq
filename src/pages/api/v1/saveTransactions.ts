import { z } from 'zod';

import { handler, HandlerError } from '@/server/handler';
import { convertToPrismaTransactions, transactionSchema } from '@/server/transactions/convertToPrismaTransactions';
import { prisma } from '@/server/prisma';
import { saveTransactionMedia } from '@/server/transactions/saveTransactionMedia';

const saveTransactionsSchema = z.object({
  listId: z.string(),
  transactions: transactionSchema.array(),
});

export default handler({
  async post(req, res) {
    const parsedBody = saveTransactionsSchema.safeParse(req.body);
    if (!parsedBody.success) throw new HandlerError(400, parsedBody.error.message);

    const { listId, transactions } = parsedBody.data;

    await prisma.$transaction(convertToPrismaTransactions(listId, transactions));
    await saveTransactionMedia(transactions);

    return res.status(204).end();
  },
});