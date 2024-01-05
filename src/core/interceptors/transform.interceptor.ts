import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { BaseDTO } from '@/common/base';
import { Observable, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

type ClassConstructor<T> = new (...args: any[]) => T;
type BaseConstructor<T> = ClassConstructor<T extends BaseDTO ? T : never>;

export class TransformInterceptor<T> implements NestInterceptor {
  constructor(private readonly constructorClass?: BaseConstructor<T>) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((value: T) => {
        return plainToInstance(this.constructorClass, value, {
          excludeExtraneousValues: true
        });
      })
    );
  }
}
