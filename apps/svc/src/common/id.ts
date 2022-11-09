import { ValueObject } from './value-object';
import { BadRequestException } from '@nestjs/common';

/**
 * ID
 */
export class Id extends ValueObject<{
  value: string;
}> {
  protected constructor(id: string) {
    super({ value: id });
    this.validate();
  }

  validate(): void {
    if (!this.props.value) {
      throw new BadRequestException();
    }
  }

  public static from(id: string): Id {
    return new Id(id);
  }

  get value(): string {
    return this.props.value;
  }
}
