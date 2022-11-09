import { AsyncLocalStorage } from 'async_hooks';
import { FlatTransactionClient } from './prisma.extend';
import { PrismaService } from './prisma.service';

type PrismaClsStore = {
  prisma?: PrismaService;
  tx?: FlatTransactionClient;
};

/**
 * トランザクションを管理するための AsyncLocalStorage
 */
export const prismaCls = new AsyncLocalStorage<PrismaClsStore>();
