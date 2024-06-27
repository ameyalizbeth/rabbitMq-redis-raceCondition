import { Injectable } from '@nestjs/common';
import { RabbitMQConsumer } from './rabbitMq.consumer';
import { NestEventEmitterType } from '../types';
import { OrderEventEmitter } from '../emitter/orderEvent.emitter';

@Injectable()
export class MyRabbitMQConsumer extends RabbitMQConsumer {
  constructor(private readonly orderEventEmitter: OrderEventEmitter) {
    super();
  }
  async handleMessage(message: any): Promise<void> {
    console.log('Received message:', message);
    switch (message.event) {
      case NestEventEmitterType.INCREMENT_AMAZON_ORDER:
      case NestEventEmitterType.INCREMENT_MYNTRA_ORDER:
        this.orderEventEmitter.emit(message.event, message.body);
        break;
      default:
        console.log('invalid event');
    }
  }
  protected getQueueName(): string {
    return 'order_queue';
  }
}
