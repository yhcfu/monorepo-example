import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { lastValueFrom } from 'rxjs';

import {
  EXAMPLE_USER_V1_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserServiceClient,
} from '@packages/protos/__generated__/example/user/v1/user';
import { ClientGrpc, BaseRpcExceptionFilter } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  private svc: UserServiceClient;
  constructor(@Inject(EXAMPLE_USER_V1_PACKAGE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.svc = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  async findAll() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return [{ exampleField: new Date().toISOString() }];
  }

  async findOne(id: number) {
    const hoge = await lastValueFrom(this.svc.createUser({ name: 'test' }));
    // .catch((e) => console.error(e));
    return { exampleField: `${id}: ${'hoge'}` };
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
