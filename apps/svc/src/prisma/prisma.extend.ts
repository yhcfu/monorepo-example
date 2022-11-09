import { Prisma, PrismaClient } from '@prisma/client';
import { prismaCls } from './prisma.cls';

export type FlatTransactionClient = Prisma.TransactionClient & {
  $commit: () => Promise<void>;
  $rollback: () => Promise<void>;
};

const ROLLBACK = { [Symbol.for('prisma.client.extension.rollback')]: true };

const resetTransaction = () => {
  const store = prismaCls.getStore();
  if (store) {
    store.tx = undefined;
  }
};

export const prismaExtendedClient = (prismaClient: PrismaClient) =>
  prismaClient.$extends({
    query: {
      $allModels: {
        /**
         * すべての操作に於いて、既にトランザクションが存在している場合はトランザクション内で実行するための処理
         */
        async $allOperations({ args, query, model, operation }) {
          // トランザクション内で実行する場合、isInTransactionを除外して query を実行する
          if ('isInTransaction' in args) {
            const { isInTransaction, ...rest } = args;
            return query(rest);
          }

          // トランザクションが存在している場合、トランザクション内で実行する
          const tx = prismaCls.getStore()?.tx;
          if (tx) {
            // $allOperations のループに陥ってしまうため、isInTransaction を追加して実行する
            return tx[model][operation]({ ...args, isInTransaction: true });
          }

          return query(args);
        },
      },
    },
    client: {
      /**
       * トランザクションを開始する
       *
       * @see https://github.com/prisma/prisma-client-extensions/tree/main/callback-free-itx
       */
      async $begin(): Promise<FlatTransactionClient> {
        // すでにトランザクションが存在している場合はそれを返す
        const tx = prismaCls.getStore()?.tx;
        if (tx) {
          return tx;
        }

        const prisma = Prisma.getExtensionContext(this);

        let setTxClient: (txClient: Prisma.TransactionClient) => void;
        let commit: () => void;
        let rollback: () => void;

        // a promise for getting the tx inner client
        const txClient = new Promise<Prisma.TransactionClient>((res) => {
          setTxClient = (txClient) => {
            const store = prismaCls.getStore();
            if (store) {
              store.tx = txClient as FlatTransactionClient;
            }
            res(txClient);
          };
        });

        // a promise for controlling the transaction
        const txPromise = new Promise((_res, _rej) => {
          commit = () => _res(undefined);
          rollback = () => _rej(ROLLBACK);
        });

        // opening a transaction to control externally
        if ('$transaction' in prisma && typeof prisma.$transaction === 'function') {
          const tx = prisma.$transaction((txClient) => {
            setTxClient(txClient as unknown as Prisma.TransactionClient);
            return txPromise;
          });

          // return a proxy TransactionClient with `$commit` and `$rollback` methods
          return new Proxy(await txClient, {
            get(target, prop) {
              if (prop === '$commit') {
                return () => {
                  commit();
                  resetTransaction();
                  return tx;
                };
              }
              if (prop === '$rollback') {
                return () => {
                  rollback();
                  return tx.catch((e) => {
                    resetTransaction();
                    if (e === ROLLBACK) {
                      return;
                    }
                    throw e;
                  });
                };
              }
              return target[prop as keyof typeof target];
            },
          }) as FlatTransactionClient;
        }

        throw new Error('Transactions are not supported by this client');
      },
    },
  });
