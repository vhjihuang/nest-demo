import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Huang hao jie!';
  }

  getSelfHello(): string {
    return 'My name is Huang hao jie!';
  }
}
