import { Module } from '@nestjs/common';
import { UserController } from './presentation';
import { UserCommandHandlers } from './application/commands';
import { UserRepository } from './infrastructure/user.repository';
import { EventStore } from '@/common/event.store';

@Module({
  imports: [],
  controllers: [UserController],
  // TODO: EventStore は共通モジュールに移動するかも？
  providers: [...UserCommandHandlers, UserRepository, EventStore],
})
export class UserModule {}
