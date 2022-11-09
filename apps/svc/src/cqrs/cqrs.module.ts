import { DynamicModule, Module, OnApplicationBootstrap } from '@nestjs/common';
import { CommandBus, QueryBus, UnhandledExceptionBus, IEvent } from '@nestjs/cqrs';
import { ExplorerService } from '@nestjs/cqrs/dist/services/explorer.service';
import { SequentialEventBus } from './sequential-event-bus';

@Module({
  providers: [CommandBus, QueryBus, UnhandledExceptionBus, SequentialEventBus, ExplorerService],
  exports: [CommandBus, QueryBus, UnhandledExceptionBus, SequentialEventBus],
})
export class CustomCqrsModule<EventBase extends IEvent = IEvent> implements OnApplicationBootstrap {
  /**
   * Registers the CQRS Module globally.
   * @returns DynamicModule
   */
  static forRoot(): DynamicModule {
    return {
      module: CustomCqrsModule,
      global: true,
    };
  }

  constructor(
    private readonly explorerService: ExplorerService<EventBase>,
    private readonly eventBus: SequentialEventBus<EventBase>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  onApplicationBootstrap() {
    const { commands, queries, events } = this.explorerService.explore();

    this.commandBus.register(commands);
    this.queryBus.register(queries);
    this.eventBus.register(events);
  }
}
