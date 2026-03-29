import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory, Action, Subjects } from '../casl/casl-ability.factory';
import { ROLES_KEY } from '../../../common/decorators/roles.decorator';

export interface RequiredPermission {
  action: Action;
  subject: Subjects;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions =
      this.reflector.getAllAndOverride<RequiredPermission[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('No authenticated user found');
    }

    const ability = this.caslAbilityFactory.createForUser(user);

    const hasPermission = requiredPermissions.every((permission) =>
      ability.can(permission.action, permission.subject),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'You do not have the required permissions for this action',
      );
    }

    return true;
  }
}
