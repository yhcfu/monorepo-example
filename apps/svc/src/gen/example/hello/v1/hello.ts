/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "example.hello.v1";

export interface HelloQuery {
  name: string;
}

export interface HelloResponse {
  msg: string;
}

export const EXAMPLE_HELLO_V1_PACKAGE_NAME = "example.hello.v1";

export interface GreeterClient {
  sayHello(request: HelloQuery, metadata: Metadata, ...rest: any): Observable<HelloResponse>;
}

export interface GreeterController {
  sayHello(
    request: HelloQuery,
    metadata: Metadata,
    ...rest: any
  ): Promise<HelloResponse> | Observable<HelloResponse> | HelloResponse;
}

export function GreeterControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sayHello"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("Greeter", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("Greeter", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const GREETER_SERVICE_NAME = "Greeter";
