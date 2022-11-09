import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prismaExtendedClient } from './prisma.extend';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  readonly extends = prismaExtendedClient(this);

  constructor() {
    super();
    return new Proxy(this, {
      get: (target, property) => {
        return Reflect.get(property in this.extends ? this.extends : target, property);
      },
    });
  }

  async $begin() {
    return this.extends.$begin();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
