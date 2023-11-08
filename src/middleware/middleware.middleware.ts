import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class MiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('demo middleware');
    next();
  }
}
