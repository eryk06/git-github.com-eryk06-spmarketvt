import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((value) => this.excludeNullFields(value)));
  }

  private excludeNullFields(data: any): any {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        if (data[key] === null) {
          delete data[key];
        } else if (typeof data[key] === 'object') {
          data[key] = this.excludeNullFields(data[key]);
        }
      });
    }
    return data;
  }
}
