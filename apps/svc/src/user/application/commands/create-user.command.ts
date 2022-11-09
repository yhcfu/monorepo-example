import { UserRepository } from '../../infrastructure/user.repository';
import { ICommandHandler, ICommand, CommandHandler } from '@nestjs/cqrs';
import { CreateUserRequest } from '@/gen/example/user/v1/user';
import { UserAggregate } from '@/user/domains/user.aggregate';
import { Transactional } from '@/prisma/prisma.transactional';

/**
 * ユーザー作成コマンド
 */
export class CreateUserCommand implements CreateUserRequest, ICommand {
  public name: string;

  constructor(props: CreateUserRequest) {
    Object.assign(this, props);
  }
}

/**
 * ユーザー作成コマンドハンドラー
 */
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  @Transactional()
  public async execute(command: CreateUserCommand): Promise<void> {
    const user = UserAggregate.create({ name: command.name });
    await this.userRepository.save(user);
  }
}
