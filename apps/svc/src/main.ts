import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { options } from './server-grpc.options';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, options);
  await app.listen();

  console.log('---------------------------------------------');
  console.log('🚀 Server listening on http://localhost:50051');
  console.log('---------------------------------------------');
}

void bootstrap();
