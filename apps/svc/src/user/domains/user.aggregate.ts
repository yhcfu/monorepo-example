import { BaseAggregate } from '@/common/aggregate';
import { UserCreatedEvent } from '@/domain/user/events/user-created.event';
import { UserId } from '../../domain/user/models/value-objects/user-id';
import { Aggregate } from '@/cqrs/aggregate.decorator';

/**
 * ユーザー集約
 */
@Aggregate({ streamPrefix: 'User' })
export class UserAggregate extends BaseAggregate {
  public id: UserId;
  public name: string;

  /**
   * 新規作成
   */
  static create(props: { name: string }) {
    const user = new UserAggregate();
    const event = new UserCreatedEvent({
      id: UserId.generate().value,
      name: props.name,
    });
    user.apply(event);
    return user;
  }

  validate(): void {
    // TODO: 相関チェック
  }

  // -----------------------------------------------------------------
  // イベントハンドラー
  // -----------------------------------------------------------------

  onUserCreatedEvent(event: UserCreatedEvent): void {
    this.id = UserId.from(event.id);
    this.name = event.name;
  }
}
