import { DynamicModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { randomUUID } from 'crypto';
import { ClsGuard, ClsModule, ClsService } from 'nestjs-cls';
import { MyClsService } from './cls.service';

@Module({
  imports: [
    ClsModule.forRoot({
      guard: {
        mount: true,
        generateId: true,
        idGenerator: (context) => {
          // const rpcCtx = context.switchToRpc().getContext<BaseRpcContext>();
          // rpcCtx から metadata を取得する
          // const metadata = rpcCtx.getArgByIndex(0) as Metadata;
          // return metadata.get('X-Request-Id') ?? randomUUID();
          return randomUUID();
        },
        setup(cls, context) {},
      },
    }),
  ],
  providers: [
    // CLS Guard を一番初めに設定する
    // @see https://papooch.github.io/nestjs-cls/setting-up-cls-context/using-a-guard#manually
    {
      provide: APP_GUARD,
      useClass: ClsGuard,
    },
    {
      provide: MyClsService,
      useExisting: ClsService,
    },
  ],
  exports: [MyClsService],
})
export class CustomClsModule {
  /**
   * Registers the Cls Module globally.
   * @returns DynamicModule
   */
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: CustomClsModule,
    };
  }
}
