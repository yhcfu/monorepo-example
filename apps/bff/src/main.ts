import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  // create app
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // TODO: 後でCORSの調整する
  app.enableCors();

  await app.listen(3001, '0.0.0.0');

  // 絵文字付きで、サーバー起動時のログを出力する
  console.log('🚀 Server listening on http://localhost:3001');
}
bootstrap();
