import { AggregateRoot } from '@nestjs/cqrs';
import { Id } from './id';

export abstract class BaseAggregate extends AggregateRoot {
  private _version: number = 0;

  abstract id: Id;

  constructor() {
    super();
    this.validate();
  }

  get version(): number {
    return this._version;
  }

  /**
   * 集約にイベントを適用する
   */
  apply(event: any) {
    this._version++;
    super.apply(event);
  }

  /**
   * Entity や Value Object の相関チェックを実装する
   */
  abstract validate(): void;
}
