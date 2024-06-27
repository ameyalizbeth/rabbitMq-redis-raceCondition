import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export abstract class RabbitMQConsumer implements OnModuleInit {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async onModuleInit() {
    await this.connect();
    await this.setupChannel();
    await this.consume();
  }

  abstract handleMessage(message: any): Promise<void>;

  private async connect() {
    this.connection = await amqp.connect('amqp://localhost');
  }

  private async setupChannel() {
    this.channel = await this.connection.createChannel();
  }

  private async consume() {
    const queueName = this.getQueueName();
    await this.channel.assertQueue(queueName, { durable: true });
    this.channel.consume(queueName, async (msg) => {
      try {
        if (msg !== null) {
          const content = msg.content.toString();
          const message = JSON.parse(content);
          await this.handleMessage(message);
          this.channel.ack(msg);
        }
      } catch (error) {
        console.error('Error processing message:', error);
        this.channel.reject(msg, false);
      }
    });
  }

  protected abstract getQueueName(): string;
}
