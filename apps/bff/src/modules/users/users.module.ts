import { Logger, Module } from '@nestjs/common';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { EXAMPLE_USER_V1_PACKAGE_NAME } from '@packages/protos/__generated__/example/user/v1/user';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  ClientGrpcProxy,
  GrpcOptions,
  ClientGrpc,
  ClientProxy,
} from '@nestjs/microservices';
import { getOptions } from '@/grpc-client.options';
import { ChannelOptions } from '@nestjs/microservices/external/grpc-options.interface';
import { Observable, Subscription } from 'rxjs';
import { isObject, isFunction } from 'util';

import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { resolve } from 'dns';

@Module({
  imports: [],
  providers: [
    {
      provide: EXAMPLE_USER_V1_PACKAGE_NAME,
      useFactory: (config: ConfigService) => {
        const options = getOptions(config).UserService;
        return CustomClientProxyFactory.create(options);
      },
      inject: [ConfigService],
    },
    UsersResolver,
    UsersService,
  ],
})
export class UsersModule {}

class CustomClientProxyFactory {
  static create(options: GrpcOptions) {
    return new CustomClientGrpcProxy(options.options);
  }
}

class CustomClientGrpcProxy extends ClientGrpcProxy {
  constructor(options: GrpcOptions['options']) {
    super(options);
  }

  serializeError(error: any) {
    console.log(error.metadata);
    console.log(error.metadata.get('grpc-status-details-bin'));
  }

  serializeResponse(response: any) {
    console.log('hoge', response);
    return response;
  }

  public createUnaryServiceMethod(
    client: any,
    methodName: string,
  ): (...args: any[]) => Observable<any> {
    return (...args: any[]) => {
      return new Observable((observer) => {
        let commit: (meta) => void;
        const promise = new Promise((resolve) => {
          commit = resolve;
        });

        const call = client[methodName](...args, (error: any, data: any) => {
          promise.then((metadata) => {
            if (error) {
              return observer.error(
                this.serializeError({
                  ...error,
                  metadata,
                }),
              );
            }
            observer.next(data);
            observer.complete();
          });
        });

        call.on('metadata', (metadata) => {
          commit(metadata);
        });

        return () => {
          if (!call.finished) {
            console.log('?');
            call.cancel();
          }
        };
      });
    };
  }
}
