import { join } from 'path';

import { GrpcOptions, Transport } from '@nestjs/microservices';

import { EXAMPLE_HERO_V1_PACKAGE_NAME } from '@/gen/example/hero/v1/hero';
import { EXAMPLE_USER_V1_PACKAGE_NAME } from '@/gen/example/user/v1/user';

export const options: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50051',
    package: [EXAMPLE_HERO_V1_PACKAGE_NAME, EXAMPLE_USER_V1_PACKAGE_NAME],
    protoPath: [
      join(__dirname, '../proto/example/hero/v1//hero.proto'),
      join(__dirname, '../proto/example/user/v1/user.proto'),
    ],
  },
};
