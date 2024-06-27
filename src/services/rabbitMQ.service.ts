import { Injectable } from '@nestjs/common';
import { RabbitMQConfig } from '../config/rabbitMQ.config';
import { connect } from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection;
  private channel;
  private readonly rabbitMQConfig: RabbitMQConfig;

  constructor() {
    this.rabbitMQConfig = new RabbitMQConfig();
  }
  async initialize() {
    this.connection = await connect({
      hostname: this.rabbitMQConfig.hostname,
      port: this.rabbitMQConfig.port,
      username: this.rabbitMQConfig.username,
      password: this.rabbitMQConfig.password,
      vhost: this.rabbitMQConfig.vhost,
    });

    this.channel = await this.connection.createChannel();
  }
  async sendMessage(queue: string, message: any) {
    await this.channel.assertQueue(queue, { durable: true }); // Make the queue durable
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }

  async consumeMessage(queue: string, callback: (msg: any) => void) {
    await this.channel.assertQueue(queue, { durable: true }); // Make the queue durable
    this.channel.prefetch(1); // Process only one message at a time
    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        const message = JSON.parse(content);
        callback(message);
        this.channel.ack(msg); // Acknowledge the message after processing
      }
    });
  }
}
