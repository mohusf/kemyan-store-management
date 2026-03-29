import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';
import { AuditService } from '../audit.service';

const STATE_CHANGING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const method = request.method;

    if (!STATE_CHANGING_METHODS.includes(method)) {
      return next.handle();
    }

    const user = request.user as any;
    const controller = context.getClass().name;
    const handler = context.getHandler().name;
    const entityType = controller.replace('Controller', '');

    const startBody = { ...request.body };

    return next.handle().pipe(
      tap({
        next: (responseData) => {
          const entityId = responseData?.id || request.params?.id || 'unknown';

          this.auditService
            .logEvent({
              entityType,
              entityId: String(entityId),
              action: `${method} ${handler}`,
              previousData: method === 'PUT' || method === 'PATCH' ? startBody : undefined,
              newData: responseData,
              performedBy: user?.id || 'system',
              ipAddress: request.ip || request.socket.remoteAddress,
              userAgent: request.headers['user-agent'],
            })
            .catch((err) => {
              console.error('Failed to write audit log:', err.message);
            });
        },
      }),
    );
  }
}
