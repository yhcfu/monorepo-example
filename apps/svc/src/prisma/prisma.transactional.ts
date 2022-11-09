import { ICommandHandler } from '@nestjs/cqrs';
import { prismaCls } from './prisma.cls';

/**
 * トランザクションを開始する
 * - `ICommandHandler` を実装したクラスのメソッドに付与する
 */
export const Transactional = () => {
  return (target: ICommandHandler, key: string, descriptor: PropertyDescriptor) => {
    //もともとのメソッドを退避しておく
    const originalMethod = descriptor.value as (...args) => Promise<any>;

    //メソッドを書き換える
    descriptor.value = async function () {
      const store = prismaCls.getStore();

      // 既にトランザクションが開始されている場合は、そのまま実行する（二重にトランザクションを開始しない）
      if (store?.tx) {
        return originalMethod.apply(this, arguments);
      }

      // トランザクションを開始する
      if (store?.prisma) {
        store.tx = await store.prisma.$begin();
      }

      try {
        // もともとのメソッドを実行する
        const result = await originalMethod.apply(this, arguments);
        // トランザクションをコミットし、結果を返す
        await store?.tx?.$commit();
        return result;
      } finally {
        if (store?.tx) {
          // トランザクションの開放漏れがないように、念のためロールバックを実行する
          await store.tx.$rollback();
        }
      }
    };
  };
};
