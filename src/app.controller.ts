import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('test') private readonly appService: AppService,
    @Inject('test2') private readonly shop: string[],
    @Inject('test3') private readonly test3: string[],
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // @Get()
  // getMyName(): string {
  //   return this.appService.getSelfHello();
  // }

  @Get('test3')
  getTest3(): string[] {
    return this.test3;
  }

  @Get('shop')
  getShop(): string[] {
    return this.shop;
  }
}
