import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from './prisma.service';
import { prismaCls } from './prisma.cls';

/**
 * prisma モジュールを request-scoped 毎に AsyncLocalStorage にセットするための Interceptor
 */
@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const store = {
      prisma: this.prisma,
      tx: undefined,
    };

    return new Observable((subscriber) => {
      const subscription = prismaCls.run(store, () => {
        return next.handle().subscribe(subscriber);
      });
      return () => subscription.unsubscribe();
    });
  }
}
