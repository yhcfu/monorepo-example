import { ClsService, ClsStore } from 'nestjs-cls';
import { Prisma, PrismaClient } from '@prisma/client';

export interface MyClsStore extends ClsStore {
  prisma: PrismaClient;
  tx: Prisma.TransactionClient;
}

/**
 * @see https://papooch.github.io/nestjs-cls/features-and-use-cases/type-safety-and-type-inference#using-a-custom-provider
 */
export class MyClsService extends ClsService<MyClsStore> {}
