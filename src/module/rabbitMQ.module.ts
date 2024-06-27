import { Module, OnModuleInit } from '@nestjs/common';
import { RabbitMQConfig } from '../config/rabbitMQ.config';
import { MyRabbitMQConsumer } from '../event/consumer/myRabbitMQ.consumer';
import { RabbitMQService } from '../services/rabbitMQ.service';
import { OrderEventEmitter } from '../event/emitter/orderEvent.emitter';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
  providers: [
    RabbitMQConfig,
    RabbitMQService,
    MyRabbitMQConsumer,
    OrderEventEmitter,
  ],
  exports: [RabbitMQService],
})
export class RabbitMQModule implements OnModuleInit {
  constructor(private readonly rabbitmqService: RabbitMQService) {}
  async onModuleInit() {
    await this.rabbitmqService.initialize();
    console.log('Connected to RabbitMQ');
  }
}
