import { PrismaService } from '@/prisma/prisma.service';
import { EventBus, IEvent, IEventPublisher, IMessageSource } from '@nestjs/cqrs';
import { randomUUID } from 'node:crypto';
import { BaseAggregate } from './aggregate';
import { AGGREGATE_METADATA } from '@/cqrs/constatns';
import { AggregateMetadata } from '@/cqrs/aggregate.decorator';
import { getAggregateMetadata } from '@/cqrs/aggregate.metadata';
import { Id } from './id';
import { UserId } from '@/domain/user/models/value-objects/user-id';
import { Injectable } from '@nestjs/common';

/**
 * イベントストリーム
 *
 * - イベントストアに格納されるイベントの集合を表すオブジェクト
 */
export class EventStream {
  public readonly streamId: string;
  public readonly aggregateVersion: number = 0;
  public readonly events: IEvent[];

  private constructor(props: EventStream) {
    Object.assign(this, props);
  }

  /**
   * イベントストリームを作成する
   *
   * @param aggregate 集約ルート
   * @returns イベントストリーム
   */
  static for(aggregate: BaseAggregate): EventStream {
    const { streamPrefix } = getAggregateMetadata(aggregate);

    return new EventStream({
      streamId: `${streamPrefix}-${aggregate.id.value}`,
      aggregateVersion: aggregate.version,
      events: aggregate.getUncommittedEvents(),
    });
  }
}

@Injectable()
export class EventStore {
  constructor(private readonly prisma: PrismaService) {}

  async appendEvents(stream: EventStream) {
    const { streamId, events, aggregateVersion } = stream;
    let version = aggregateVersion - events.length + 1;

    const data = events.map((event, index) => ({
      streamId,
      version: version + index,
      eventType: event.constructor.name,
      payload: event,
    }));

    // ジャーナルDBの更新
    await this.prisma.events.createMany({ data });
  }

  async getEvents(streamId: string): Promise<IEvent[]> {
    const events = await this.prisma.events.findMany({
      where: { streamId },
      orderBy: { version: 'asc' },
    });

    return events;
  }
}
