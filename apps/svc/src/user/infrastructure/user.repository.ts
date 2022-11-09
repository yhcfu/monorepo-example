import { UserAggregate } from '@/user/domains/user.aggregate';
import { EventStore, EventStream } from '../../common/event.store';
import { BaseAggregate } from '@/common/aggregate';
import { Id } from '@/common/id';
import { Injectable } from '@nestjs/common';
import { UserId } from '@/domain/user/models/value-objects/user-id';

interface IAggregateRepository<T extends BaseAggregate> {
  /** 集約を保存する */
  save(aggregate: T): Promise<void>;

  /** 集約を取得する */
  getId(id: Id): Promise<T>;
}

@Injectable()
export class UserRepository implements IAggregateRepository<UserAggregate> {
  constructor(private readonly eventStore: EventStore) {}

  async save(user: UserAggregate) {
    const stream = EventStream.for(user);
    // eventStream に変換する
    // スナップショットを追加する
    await Promise.all([
      // 待つ
      this.eventStore.appendEvents(stream),
    ]);
  }

  getId(id: UserId): Promise<UserAggregate> {
    throw new Error('Method not implemented.');
  }
}
