import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { RabbitMQModule } from './rabbitMQ.module';
import { RedisEventConsumer } from '../event/consumer/nestevent.consumer';
import { RedisService } from '../services/redis.service';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';

@Module({
  imports: [
    RabbitMQModule,
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RedisEventConsumer, RedisService],
})
export class AppModule {}
