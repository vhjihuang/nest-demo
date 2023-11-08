import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoController } from './demo/demo.controller';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { Logger } from './app.middleware';
import { UploadModule } from './upload/upload.module';
import { PipeModule } from './pipe/pipe.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
const entitiesPaths = [join(__dirname, '**', '*.entity{.ts,.js}')];

@Module({
  imports: [
    DemoModule,
    UserModule,
    ConfigModule.forRoot({ path: '/common' }),
    UploadModule,
    PipeModule,
    LoginModule,
    GuardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '913062923',
      database: 'db',
      host: 'localhost',
      port: 3306,
      synchronize: true,
      entities: entitiesPaths,
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController, DemoController],
  providers: [
    AppService,
    {
      provide: 'test',
      useClass: AppService,
    },
    {
      provide: 'test2',
      useValue: ['TB', 'PDD', 'JD'],
    },
    {
      provide: 'test3',
      inject: [AppService],
      useFactory: (AppService: AppService) => {
        return AppService.getHello();
        // return ['test3', 'test3', 'test3'];
      },
    },
    {
      provide: 'test4',
      inject: [AppService],
      async useFactory(AppService: AppService) {
        return await new Promise(res => {
          setTimeout(() => {
            res(AppService.getHello());
          }, 1000);
        });
      },
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Logger).forRoutes({ path: 'demo', method: RequestMethod.POST });
  }
}
