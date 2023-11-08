import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { ResponseData } from './common/Response';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// const whiteList = ['/demo', '/register'];

function Middleware(req: Request, res: Response, next: NextFunction) {
  console.log('全局中间件');
  console.log(req.originalUrl);
  // if (whiteList.includes(req.originalUrl)) {
  //   res.send({ message: '白名单' });
  // } else {
  next();
  // }
}

//
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder().setDescription('nestjs-demo').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  app.use(
    session({ secret: 'huangHji', rolling: true, name: 'sessionId', cookie: { maxAge: 99999999 } }),
  );
  app.use(cors({ origin: true, credentials: true }));
  console.log(join(process.cwd(), '/dist/images'), 'path');
  console.log(join(__dirname, 'images'), '__dirname');
  // app.useStaticAssets(join(__dirname, 'images'));
  app.useStaticAssets(join(process.cwd(), '/dist/images'));
  // app.useGlobalFilters(new HttpFilter());
  app.useGlobalInterceptors(new ResponseData());
  app.useGlobalPipes(new ValidationPipe());

  app.use(Middleware);
  await app.listen(3000);
}
bootstrap();
