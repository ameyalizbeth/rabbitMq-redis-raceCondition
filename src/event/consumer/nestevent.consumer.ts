import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RedisService } from '../../services/redis.service';
import { NestEventEmitterType } from '../types';

@Injectable()
export class RedisEventConsumer {
  constructor(private redisService: RedisService) {}

  @OnEvent(NestEventEmitterType.INCREMENT_AMAZON_ORDER, { async: true })
  async onRewardItemAdded(event: any) {
    try {
      const incrementedValue = await this.redisService.increment(
        event.data.key,
      );
      console.log(
        `incremented order: current order number :${incrementedValue}`,
      );
    } catch (err) {}
  }

  @OnEvent(NestEventEmitterType.INCREMENT_MYNTRA_ORDER, { async: true })
  async onRewardItemUpdated(event: any) {
    try {
      const incrementedValue = await this.redisService.increment(
        event.data.key,
      );
      console.log(
        `incremented order: current order number :${incrementedValue}`,
      );
    } catch (err) {}
  }
}
