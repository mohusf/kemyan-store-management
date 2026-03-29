# KEMYAN Store Management — API Reference

Base URL: `/api/v1`

All endpoints require JWT authentication unless noted. Responses follow the format:
```json
{ "data": {}, "meta": { "page": 1, "limit": 20, "total": 100 } }
```

## Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | Login with email/password | No |
| POST | `/auth/refresh` | Refresh JWT token | Refresh token |
| GET | `/auth/me` | Get current user profile | Yes |
| POST | `/auth/logout` | Invalidate session | Yes |

## Materials

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/materials` | List materials (paginated, filterable) | All |
| GET | `/materials/:id` | Get material detail | All |
| POST | `/materials` | Create material | Store Manager, Admin |
| PUT | `/materials/:id` | Update material | Store Manager, Admin |
| DELETE | `/materials/:id` | Soft-delete material | Admin |
| GET | `/materials/:id/sds` | Get current SDS for material | All |
| GET | `/materials/categories` | List material categories | All |

## Requisitions

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/requisitions` | List requisitions (scoped by role) | All |
| GET | `/requisitions/:id` | Get requisition detail + approval history | All |
| POST | `/requisitions` | Create new requisition | All (except Technician) |
| PUT | `/requisitions/:id` | Update draft requisition | Requester |
| POST | `/requisitions/:id/submit` | Submit for approval | Requester |
| POST | `/requisitions/:id/approve` | Approve requisition step | Current approver |
| POST | `/requisitions/:id/reject` | Reject requisition | Current approver |
| POST | `/requisitions/:id/cancel` | Cancel requisition | Requester, Admin |

## Procurement

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/purchase-orders` | List POs | Procurement, Admin |
| GET | `/purchase-orders/:id` | Get PO detail with lines | Procurement, Admin |
| POST | `/purchase-orders` | Create PO | Procurement Officer |
| PUT | `/purchase-orders/:id` | Update draft PO | Procurement Officer |
| POST | `/purchase-orders/:id/approve` | Approve PO | Procurement Manager |
| POST | `/purchase-orders/:id/send` | Mark as sent to supplier | Procurement Officer |
| GET | `/grn` | List GRNs | Store Keeper+ |
| POST | `/grn` | Create GRN (receive goods) | Store Keeper |
| GET | `/grn/:id` | Get GRN detail | Store Keeper+ |

## Inventory

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/inventory/transactions` | List transactions (filterable) | Store Keeper+ |
| GET | `/inventory/stock-levels` | Current stock by material | All |
| POST | `/inventory/receive` | Record stock receipt | Store Keeper |
| POST | `/inventory/issue` | Issue stock against requisition | Store Keeper |
| POST | `/inventory/transfer` | Transfer between locations | Store Keeper |
| POST | `/inventory/adjust` | Stock adjustment with reason | Store Manager |
| GET | `/inventory/batches` | List batches (filterable) | All |
| GET | `/inventory/batches/:id` | Batch detail with trace | All |
| GET | `/inventory/batches/:id/trace-forward` | Forward traceability | Quality Manager+ |
| GET | `/inventory/batches/:id/trace-backward` | Backward traceability | Quality Manager+ |

## Warehouse

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/warehouse/zones` | List zones | All |
| GET | `/warehouse/zones/:id` | Zone detail with locations | All |
| POST | `/warehouse/zones` | Create zone | Admin |
| GET | `/warehouse/locations` | List storage locations | All |
| POST | `/warehouse/locations` | Create location | Store Manager |
| PUT | `/warehouse/locations/:id` | Update location | Store Manager |
| POST | `/warehouse/locations/:id/validate-compatibility` | Check chemical compatibility | Store Keeper+ |

## Suppliers

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/suppliers` | List suppliers | Procurement+ |
| GET | `/suppliers/:id` | Supplier detail | Procurement+ |
| POST | `/suppliers` | Create supplier | Procurement Manager |
| PUT | `/suppliers/:id` | Update supplier | Procurement Manager |
| GET | `/suppliers/:id/evaluations` | Supplier evaluation history | Procurement+ |
| POST | `/suppliers/:id/evaluations` | Create evaluation | Procurement Manager |

## Quality

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/inspections` | List inspections | Quality+ |
| POST | `/inspections` | Create inspection record | Quality Manager |
| GET | `/inspections/:id` | Inspection detail | Quality+ |
| GET | `/ncr` | List NCRs | Quality+ |
| POST | `/ncr` | Create NCR | Quality Manager |
| PUT | `/ncr/:id` | Update NCR (root cause, CAPA) | Quality Manager |
| GET | `/coa` | List certificates of analysis | Quality+ |
| POST | `/coa` | Upload COA | Quality Manager |

## Compliance

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/sds` | List SDS records | All |
| GET | `/sds/:id` | SDS detail | All |
| POST | `/sds` | Create/update SDS | Compliance, Admin |
| GET | `/waste` | List waste records | Compliance+ |
| POST | `/waste` | Create waste record | Compliance |
| GET | `/ppe` | List PPE issuances | Store Keeper+ |
| POST | `/ppe` | Record PPE issuance | Store Keeper |

## Documents

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/documents` | List documents | All |
| GET | `/documents/:id` | Document detail | All |
| POST | `/documents` | Upload document | Document Controller |
| PUT | `/documents/:id` | Update document metadata | Document Controller |
| POST | `/documents/:id/acknowledge` | Acknowledge document | All |

## Reports

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/reports/dashboard` | KPI dashboard data | Manager+ |
| GET | `/reports/inventory-health` | Inventory health metrics | Store Manager+ |
| GET | `/reports/procurement-efficiency` | Procurement KPIs | Procurement Manager+ |
| GET | `/reports/supplier-performance` | Supplier scorecards | Procurement+ |
| GET | `/reports/compliance-status` | Compliance dashboard | Quality Manager+ |
| POST | `/reports/export` | Generate PDF/Excel report | Manager+ |

## Audit

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/audit-logs` | Query audit trail | Admin, Manager |
| GET | `/audit-logs/entity/:type/:id` | Audit history for entity | Admin, Manager |
