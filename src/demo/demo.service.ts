import { Injectable, Get } from '@nestjs/common';

@Injectable()
export class DemoService {
  @Get()
  getHello(): string {
    return 'demo service';
  }
}
