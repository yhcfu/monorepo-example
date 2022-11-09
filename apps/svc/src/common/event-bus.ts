import { EventBus, IEvent, UnhandledExceptionBus } from '@nestjs/cqrs';

export class AsyncEventBus extends EventBus {
  publishAll<TEvent extends IEvent, TContext = unknown>(
    events: TEvent[],
    context?: TContext,
  ): Promise<unknown>[] {
    return super.publishAll(events, context);
  }
}
