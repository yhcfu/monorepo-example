import { Injectable } from '@nestjs/common';
import {} from 'lodash-es';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  async findAll() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return [{ exampleField: new Date().toISOString() }];
  }

  async findOne(id: number) {
    await new Promise((resolve) => setTimeout(resolve, id * 1000));
    return { exampleField: `${id}: ${new Date().toISOString()}` };
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
