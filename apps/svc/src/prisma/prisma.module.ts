import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaInterceptor } from './prisma.interceptor';

@Module({
  providers: [
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PrismaInterceptor,
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {
  /**
   * Registers the Prisma Module globally.
   * @returns DynamicModule
   */
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
    };
  }
}
