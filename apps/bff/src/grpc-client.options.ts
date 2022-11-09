import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { USER_SERVICE_NAME } from '@packages/protos/__generated__/example/user/v1/user';

export const makeOptions = (options: GrpcOptions['options']): GrpcOptions => ({
  transport: Transport.GRPC,
  options,
});

export const getOptions = (config: ConfigService) => {
  const url = config.getOrThrow<string>('GRPC_SVC_URL');

  return {
    [USER_SERVICE_NAME]: makeOptions({
      url,
      package: 'example.user.v1',
      protoPath: [join(__dirname, './protos/example/user/v1/user.proto')],
    }),
  } as const;
};
