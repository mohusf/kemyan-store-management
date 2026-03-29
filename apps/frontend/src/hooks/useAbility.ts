import { useMemo } from 'react';
import { AbilityBuilder, createMongoAbility, type MongoAbility } from '@casl/ability';
import { useAuthStore } from '../store/authStore';

type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage' | 'approve';
type Subjects =
  | 'Material'
  | 'Requisition'
  | 'PurchaseOrder'
  | 'Inventory'
  | 'Supplier'
  | 'Inspection'
  | 'NCR'
  | 'SDS'
  | 'Waste'
  | 'Document'
  | 'Report'
  | 'AuditLog'
  | 'Settings'
  | 'all';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

function defineAbilityFor(role: string, permissions: string[]): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (role === 'admin') {
    can('manage', 'all');
  } else {
    permissions.forEach((permission) => {
      const [action, subject] = permission.split(':') as [Actions, Subjects];
      if (action && subject) {
        can(action, subject);
      }
    });

    // Default read permissions for all authenticated users
    can('read', 'Material');
    can('read', 'Inventory');
  }

  return build();
}

export function useAbility(): AppAbility {
  const user = useAuthStore((state) => state.user);

  return useMemo(() => {
    if (!user) {
      return createMongoAbility<[Actions, Subjects]>();
    }
    return defineAbilityFor(user.role, user.permissions);
  }, [user]);
}
