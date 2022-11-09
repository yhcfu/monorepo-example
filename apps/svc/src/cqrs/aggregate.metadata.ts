import { BaseAggregate } from '@/common/aggregate';
import { AGGREGATE_METADATA } from './constatns';
import { AggregateMetadata } from './aggregate.decorator';

export const getAggregateMetadata = (aggregate: BaseAggregate): AggregateMetadata => {
  const { constructor } = Object.getPrototypeOf(aggregate);
  return Reflect.getMetadata(AGGREGATE_METADATA, constructor);
};
