import { BadRequestException, Controller } from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  UserServiceController,
  UserServiceControllerMethods,
} from '@/gen/example/user/v1/user';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../application/commands/create-user.command';

@Controller('user')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly commandBus: CommandBus) {}

  async createUser(
    request: CreateUserRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<CreateUserResponse> {
    const serverMetadata = new Metadata();
    // serverMetadata.add('Set-Cookie', 'test_cookie=abcd');
    // serverMetadata.add('grpc-status-details-bin', Buffer.from('test'));
    // call.sendMetadata(serverMetadata);
    throw new BadRequestException();

    await this.commandBus.execute(new CreateUserCommand(request));
    return {
      id: '1',
      name: request.name,
    };
  }
}
