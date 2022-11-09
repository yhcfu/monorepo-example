/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "example.hero.v1";

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export const EXAMPLE_HERO_V1_PACKAGE_NAME = "example.hero.v1";

export interface HeroesServiceClient {
  findOne(request: HeroById, metadata: Metadata, ...rest: any): Observable<Hero>;
}

export interface HeroesServiceController {
  findOne(request: HeroById, metadata: Metadata, ...rest: any): Promise<Hero> | Observable<Hero> | Hero;
}

export function HeroesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HeroesService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HeroesService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HEROES_SERVICE_NAME = "HeroesService";
