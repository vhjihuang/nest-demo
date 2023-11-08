import { Controller, Get, Inject, Post } from '@nestjs/common';
// import { UserService } from '../user/user.service';
import { DemoService } from './demo.service';

@Controller('demo')
export class DemoController {
  constructor(
    private readonly demoService: DemoService,
    @Inject('config') private readonly appName: any,
  ) {}

  @Get()
  findAll() {
    return this.appName;
    // return this.userService.findAll();
  }
  @Get('find')
  findOne() {
    return this.demoService.getHello();
  }
  @Post('middleware')
  middleware() {
    // return this.userService.findAll();
    return 'xxx';
  }
}
