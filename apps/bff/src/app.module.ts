import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      // コードから、GraphQL のスキーマを自動生成する
      autoSchemaFile: join(process.cwd(), '/generated/schema.gql'),

      graphiql: false,
      ide: true,
      jit: 1,
    }),

    // src/domains/*
    UsersModule,
  ],
})
export class AppModule {}
