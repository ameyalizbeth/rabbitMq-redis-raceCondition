import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitMQConfig {
  public readonly hostname: string;
  public readonly port: string;
  public readonly username: string;
  public readonly password: string;
  public readonly vhost: any;

  constructor() {
    (this.hostname = process.env.RABBITMQ_HOST),
      (this.port = process.env.RABBITMQ_PORT),
      (this.username = process.env.RABBITMQ_USERNAME),
      (this.password = process.env.RABBITMQ_PASSWORD),
      (this.vhost = '/');
  }
}
