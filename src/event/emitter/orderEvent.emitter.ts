import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderEventEmitter {
  constructor(private nestEventEmitter: EventEmitter2) {}

  async emit(event: string, data: any) {
    console.log(
      `NestEventEmitter - emitting event for RewardEventEmitter with: ${event} - ${JSON.stringify(
        data,
      )}`,
    );
    return this.nestEventEmitter.emit(event, {
      data,
    });
  }
}
