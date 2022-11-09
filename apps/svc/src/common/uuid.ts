import { randomUUID } from 'crypto';
import { Id } from './id';
import { BadRequestException } from '@nestjs/common';

/**
 * UUID
 */
export class UUID extends Id {
  protected constructor(id: string) {
    super(id);
    super.validate();
    this.validate();
  }

  /**
   * UUID を生成する
   */
  public static generate(): UUID {
    const id = randomUUID();
    return new UUID(id);
  }

  public static from(id: string): UUID {
    return new UUID(id);
  }

  validate(): void {
    const format =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    if (!format.test(this.props.value)) {
      throw new BadRequestException();
    }
  }

  get value(): string {
    return this.props.value;
  }
}
