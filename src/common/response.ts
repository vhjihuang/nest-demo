import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Data<T> {
  data: T;
  status: number;
  message: string;
}
@Injectable()
export class ResponseData<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map(data => {
        return {
          data,
          status: 200,
          message: 'success',
        };
      }),
    );
  }
}
