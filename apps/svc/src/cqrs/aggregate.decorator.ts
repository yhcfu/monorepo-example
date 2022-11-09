import 'reflect-metadata';

import { AGGREGATE_METADATA } from './constatns';

export type AggregateMetadata = {
  /**
   * eventStore に保存されるときのストリーム名
   *
   * @example 'user-550e8400-e29b-41d4-a716-446655440000'
   */
  streamPrefix: string;
};

/**
 * Decorator that provides an aggregate with metadata.
 *
 * The decorated class must extend the `BaseAggregate` class.
 */
export const Aggregate = (options: AggregateMetadata) => {
  return (target: object) => {
    Reflect.defineMetadata(AGGREGATE_METADATA, options, target);
  };
};
