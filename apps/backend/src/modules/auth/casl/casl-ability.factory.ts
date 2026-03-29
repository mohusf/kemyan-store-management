import {
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Approve = 'approve',
  Export = 'export',
}

export type Subjects =
  | 'Material'
  | 'Requisition'
  | 'PurchaseOrder'
  | 'Inventory'
  | 'Supplier'
  | 'Inspection'
  | 'Document'
  | 'Report'
  | 'User'
  | 'AuditLog'
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    const roleName = user.role?.name;

    switch (roleName) {
      case 'plant_manager':
        can(Action.Manage, 'all');
        break;

      case 'store_manager':
        can(Action.Manage, 'Material');
        can(Action.Manage, 'Inventory');
        can(Action.Manage, 'Requisition');
        can(Action.Manage, 'PurchaseOrder');
        can(Action.Manage, 'Supplier');
        can(Action.Read, 'Report');
        can(Action.Export, 'Report');
        can(Action.Read, 'AuditLog');
        break;

      case 'procurement_officer':
        can(Action.Read, 'Material');
        can(Action.Create, 'PurchaseOrder');
        can(Action.Update, 'PurchaseOrder');
        can(Action.Approve, 'Requisition');
        can(Action.Read, 'Supplier');
        can(Action.Update, 'Supplier');
        can(Action.Read, 'Inventory');
        break;

      case 'quality_inspector':
        can(Action.Read, 'Material');
        can(Action.Read, 'Inventory');
        can(Action.Manage, 'Inspection');
        can(Action.Read, 'Supplier');
        can(Action.Read, 'Document');
        break;

      case 'warehouse_staff':
        can(Action.Read, 'Material');
        can(Action.Read, 'Inventory');
        can(Action.Create, 'Inventory');
        can(Action.Update, 'Inventory');
        can(Action.Read, 'Document');
        break;

      case 'department_supervisor':
        can(Action.Create, 'Requisition');
        can(Action.Read, 'Requisition');
        can(Action.Approve, 'Requisition');
        can(Action.Read, 'Material');
        can(Action.Read, 'Inventory');
        break;

      case 'requester':
        can(Action.Create, 'Requisition');
        can(Action.Read, 'Requisition');
        can(Action.Read, 'Material');
        break;

      default:
        can(Action.Read, 'Material');
        break;
    }

    return build();
  }
}
