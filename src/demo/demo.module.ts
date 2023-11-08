import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { MiddlewareMiddleware } from '../middleware/middleware.middleware';

@Module({
  providers: [DemoService],
  controllers: [DemoController],
  exports: [DemoService],
})
export class DemoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 配置路由
    consumer.apply(MiddlewareMiddleware).forRoutes({
      path: '/demo/find',
      method: RequestMethod.GET,
    });
  }
}
