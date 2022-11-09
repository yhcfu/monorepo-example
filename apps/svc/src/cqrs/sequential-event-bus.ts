import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EVENTS_HANDLER_METADATA } from '@nestjs/cqrs/dist/decorators/constants';
import { IEvent, IEventBus, IEventHandler, ObservableBus } from '@nestjs/cqrs';
import {
  defaultGetEventId,
  defaultReflectEventId,
} from '@nestjs/cqrs/dist/helpers/default-get-event-id';

export type EventHandlerType<EventBase extends IEvent = IEvent> = Type<IEventHandler<EventBase>>;

/**
 * 直列にイベントを処理する EventBus
 */
@Injectable()
export class SequentialEventBus<EventBase extends IEvent = IEvent>
  extends ObservableBus<EventBase>
  implements IEventBus<EventBase>
{
  // イベントハンドラーのマップ
  private readonly handlers = new Map<string, IEventHandler<EventBase>>();

  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  /**
   * イベントに対応するハンドラーを同期的に実行する
   *
   * @param event イベント
   * @param context コンテキスト（今のところ未使用）
   */
  async publish<TEvent extends EventBase, TContext = unknown>(event: TEvent, context?: TContext) {
    const eventId = defaultGetEventId(event);
    const handler = this.handlers.get(eventId);
    if (handler) {
      await handler.handle(event);
    }
  }

  /**
   * イベントに対応するハンドラーを直列に実行する
   *
   * @param events イベント配列
   * @param context コンテキスト（今のところ未使用）
   */
  async publishAll<TEvent extends EventBase, TContext = unknown>(
    events: TEvent[],
    context?: TContext,
  ): Promise<void> {
    // Promise を直列で処理する
    for (const event of events || []) {
      await this.publish(event, context);
    }
  }

  register(handlers: EventHandlerType<EventBase>[] = []) {
    handlers.forEach((handler) => this.registerHandler(handler));
  }

  protected registerHandler(handler: EventHandlerType<EventBase>) {
    const instance = this.moduleRef.get(handler, { strict: false });
    if (!instance) {
      return;
    }
    const targets = this.reflectEvents(handler);
    targets.map((event) => {
      const eventId = defaultReflectEventId(event);
      this.handlers.set(eventId, instance);
    });
  }

  private reflectEvents(handler: EventHandlerType<EventBase>): FunctionConstructor[] {
    return Reflect.getMetadata(EVENTS_HANDLER_METADATA, handler);
  }
}
