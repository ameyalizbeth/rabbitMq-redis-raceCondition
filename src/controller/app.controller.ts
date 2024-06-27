import { Controller, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/amazon')
  addAmazoneOrder() {
    this.appService.addAmazoneOrder();
  }

  @Post('/myntra')
  addMyntraOrder() {
    this.appService.addMyntraOrder();
  }
}
