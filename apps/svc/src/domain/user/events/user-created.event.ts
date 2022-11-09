import { PrismaService } from '@/prisma/prisma.service';
import { EventsHandler, IEvent, IEventHandler } from '@nestjs/cqrs';

/**
 * ユーザー作成イベント
 */
export class UserCreatedEvent implements IEvent {
  public readonly id: string;
  public readonly name: string;

  constructor(props: UserCreatedEvent) {
    Object.assign(this, props);
  }
}

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler implements IEventHandler {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * リードモデルの更新などを行う
   */
  async handle(event: UserCreatedEvent) {
    await this.prisma.user.upsert({
      where: {
        id: event.id,
      },
      create: {
        id: event.id,
        name: event.name,
      },
      update: {
        name: event.name,
      },
    });
  }
}
