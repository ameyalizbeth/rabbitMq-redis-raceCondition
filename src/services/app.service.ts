import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitMQ.service';
import { NestEventEmitterType } from '../event/types';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}
  addAmazoneOrder() {
    console.log('Adding amazone order');
    this.rabbitMQService.sendMessage('order_queue', {
      event: NestEventEmitterType.INCREMENT_AMAZON_ORDER,
      body: { key: 'orderCount' },
    });
  }

  addMyntraOrder() {
    console.log('Adding myntra order');
    this.rabbitMQService.sendMessage('order_queue', {
      event: NestEventEmitterType.INCREMENT_MYNTRA_ORDER,
      body: { key: 'orderCount' },
    });
  }
}
