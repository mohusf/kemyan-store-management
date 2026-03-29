import { SetMetadata } from '@nestjs/common';
import { Action, Subjects } from '../../modules/auth/casl/casl-ability.factory';

export const ROLES_KEY = 'check_permissions';

export interface RequiredPermission {
  action: Action;
  subject: Subjects;
}

export const CheckPermissions = (...permissions: RequiredPermission[]) =>
  SetMetadata(ROLES_KEY, permissions);
