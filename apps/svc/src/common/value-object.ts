/**
 * ValueObject
 */
export abstract class ValueObject<T extends Record<string, unknown>> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  /**
   * 同一性の比較
   */
  public equals(other: ValueObject<T>): boolean {
    if (this.constructor !== other.constructor) {
      return false;
    }

    return (
      Object.keys(this.props).length === Object.keys(other.props).length &&
      Object.keys(this.props).every((key) => this.props[key] === other.props[key])
    );
  }

  /**
   * バリデーション
   */
  abstract validate(): void;
}
