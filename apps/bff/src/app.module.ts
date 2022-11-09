import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

import { UsersModule } from './domains/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      // コードから、GraphQL のスキーマを自動生成する
      autoSchemaFile: join(process.cwd(), '/generated/schema.gql'),
      federationMetadata: true,
      graphiql: false,
      ide: true,
      jit: 1,
    }),

    // src/domains/*
    UsersModule,
  ],
})
export class AppModule {}
