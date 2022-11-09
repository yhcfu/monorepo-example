import { Module } from '@nestjs/common';

import { CustomClsModule } from './cls.module';
import { PrismaModule } from './prisma/prisma.module';
import { CustomCqrsModule } from '@/cqrs/cqrs.module';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './exception.interceptor';

@Module({
  imports: [
    /**
     * 共通モジュール
     */
    CustomClsModule.forRoot(),
    CustomCqrsModule.forRoot(),
    PrismaModule.forRoot(),
    /**
     * コンテキスト毎のモジュール
     */
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
