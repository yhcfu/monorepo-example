/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "example.user.v1";

export interface CreateUserRequest {
  name: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
}

export const EXAMPLE_USER_V1_PACKAGE_NAME = "example.user.v1";

export interface UserServiceClient {
  createUser(request: CreateUserRequest, metadata: Metadata, ...rest: any): Observable<CreateUserResponse>;
}

export interface UserServiceController {
  createUser(
    request: CreateUserRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
