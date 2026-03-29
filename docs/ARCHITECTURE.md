# KEMYAN Store Management System — Architecture

## System Overview

An IMS-compliant store management system for KEMYAN's chemical manufacturing and feed additive operations in Yanbu Industrial City, Saudi Arabia. Built as a **TypeScript modular monolith** with React frontend, NestJS backend, and PostgreSQL database.

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 19 + TypeScript + Vite | SPA with PWA/offline support |
| UI Components | Ant Design 5 | Enterprise forms, RTL support |
| State | TanStack Query + Zustand | Server-state cache + client state |
| Backend | NestJS (TypeScript) | Modular REST API + WebSocket |
| Database | PostgreSQL 16+ | ACID transactions, JSONB, audit |
| Cache | Redis 7 | Sessions, pub/sub, queue backend |
| Workflow | XState v5 | Approval state machines |
| Auth | CASL v6 | Isomorphic RBAC + ABAC |
| Queue | BullMQ | Escalations, notifications |
| i18n | i18next | Arabic/English bilingual |

## Monorepo Structure

```
kemyan-store-management/
├── apps/
│   ├── backend/                  # NestJS API server
│   │   └── src/
│   │       ├── main.ts
│   │       ├── app.module.ts
│   │       ├── config/           # Database, app configuration
│   │       ├── common/           # Shared decorators, filters, pipes, events
│   │       ├── database/
│   │       │   ├── migrations/   # 13 SQL migration files
│   │       │   └── seeds/        # Role, zone, material seed data
│   │       └── modules/
│   │           ├── auth/         # JWT auth, CASL RBAC
│   │           ├── materials/    # Material catalog, GHS, SDS
│   │           ├── requisition/  # Approval workflows (XState)
│   │           ├── procurement/  # PO, GRN, ZATCA e-invoicing
│   │           ├── inventory/    # Append-only ledger, FIFO/FEFO
│   │           ├── warehouse/    # Zones, bins, compatibility
│   │           ├── suppliers/    # Qualification, GMP+/FAMI-QS
│   │           ├── quality/      # QC, NCR/CAPA, COA
│   │           ├── compliance/   # SDS, waste, PPE
│   │           ├── documents/    # ISO 9001 doc control
│   │           ├── reporting/    # KPI dashboards, exports
│   │           └── audit/        # Immutable hash-chained logs
│   └── frontend/                 # React + Vite SPA
│       └── src/
│           ├── components/       # Shared UI components
│           ├── config/           # Theme, query client
│           ├── hooks/            # Custom React hooks
│           ├── i18n/             # Arabic + English translations
│           ├── layouts/          # Main + Auth layouts
│           ├── pages/            # Route-based page components
│           ├── router/           # React Router config
│           ├── services/         # API client + service layer
│           └── store/            # Zustand stores
├── packages/
│   └── shared/                   # Shared types, enums, constants
│       └── src/
│           ├── types/            # 11 type definition files
│           └── constants/        # Approval thresholds, compatibility, regulatory
├── docs/                         # Architecture, API, deployment docs
├── docker-compose.yml
└── package.json                  # Workspace root
```

## Module Dependencies

```
auth ──────────────────────────────────────────────────── (standalone)
  ↑
materials ─────────────────────────────────────────────── depends on: auth
  ↑
requisition ───────────────────────────────────────────── depends on: auth, materials
  ↑
procurement ───────────────────────────────────────────── depends on: auth, materials, suppliers, requisition
  ↑
inventory ─────────────────────────────────────────────── depends on: auth, materials, warehouse
  ↑
warehouse ─────────────────────────────────────────────── depends on: auth, compliance
  ↑
suppliers ─────────────────────────────────────────────── depends on: auth
  ↑
quality ───────────────────────────────────────────────── depends on: auth, materials, inventory
  ↑
compliance ────────────────────────────────────────────── depends on: auth, materials
  ↑
documents ─────────────────────────────────────────────── depends on: auth
  ↑
reporting ─────────────────────────────────────────────── depends on: all modules (read-only)
  ↑
audit ─────────────────────────────────────────────────── depends on: auth (cross-cutting)
```

Cross-module communication uses NestJS CQRS event bus. Key domain events:
- `MaterialReceived` — triggers quality inspection + inventory update
- `POApproved` — triggers supplier notification
- `StockBelowReorderPoint` — triggers procurement alert
- `BatchExpiringSoon` — triggers compliance alert
- `RequisitionStatusChanged` — triggers notification chain

## Database Design

### Core Tables by Module

| Module | Tables |
|--------|--------|
| Auth | `users`, `roles` |
| Materials | `materials`, `material_categories` |
| Suppliers | `suppliers`, `supplier_evaluations` |
| Warehouse | `zones`, `storage_locations` |
| Inventory | `batches`, `inventory_transactions` |
| Procurement | `purchase_orders`, `purchase_order_lines`, `goods_received_notes`, `grn_lines` |
| Requisition | `requisitions`, `approval_steps` |
| Quality | `inspections`, `certificates_of_analysis`, `non_conformance_reports` |
| Compliance | `sds_records`, `waste_records`, `ppe_issuances` |
| Documents | `documents`, `document_acknowledgments` |
| Audit | `audit_logs` |

### Append-Only Inventory Ledger

The `inventory_transactions` table is **insert-only** — PostgreSQL rules prevent UPDATE and DELETE. Every stock movement (receive, issue, transfer, adjust, return, write-off) creates a new row with:
- Batch and material reference
- Transaction type and quantity
- Reference to source document (GRN, requisition, adjustment)
- Performing user and reason
- Running balance (computed by trigger)

This provides a complete, tamper-evident history of all inventory movements.

### Batch Traceability (GMP+/FAMI-QS)

Each `batch` record links to its supplier, quality inspection, and storage location. Finished product batches link to consumed raw material batches via `raw_material_batches UUID[]`.

- **Forward trace**: Raw material batch → finished product batches → customers
- **Backward trace**: Customer complaint → finished batch → raw material lots → suppliers

Must be producible within **4 hours** per GMP+ requirements.

### Audit Trail with Hash Chaining

The `audit_logs` table uses SHA-256 hash chaining where each record's `hash_chain` field = SHA-256(previous_hash + current_row_data). This creates tamper-evident audit trails satisfying ISO 9001:2015 Clause 7.5.

## Approval Workflow (XState)

Requisition approval follows a configurable state machine:

```
DRAFT → PENDING_SUPERVISOR → PENDING_STORE_MANAGER → PENDING_PROCUREMENT → APPROVED → PO_CREATED
                                         ↓
                                    PENDING_PLANT_MANAGER  (if value > SAR 10,000)
```

Routing rules:
- Below SAR 2,000: Supervisor → Store Manager (auto-route to procurement)
- SAR 2,000–10,000: Supervisor → Store Manager → Procurement Officer
- Above SAR 10,000: Full chain including Plant Manager
- Emergency: Direct to Store Manager with post-facto review
- Feed-grade materials: Parallel Quality Manager review at any threshold

## Chemical Compatibility Enforcement

Uses the 23-group CRC classification system. When assigning a chemical to a storage bin, the system validates compatibility against all chemicals in that zone. Four primary zones:

- **Zone A (RM-ACID)**: Phosphoric acid, sulfuric acid — stainless steel containment, bunding
- **Zone B (RM-CALCIUM)**: Limestone, quicklime — dry storage, dust control
- **Zone C (FG)**: Finished MCP, DCP — humidity < 75%, palletized
- **Zone QC-HOLD**: Quarantine for batches pending quality release

## RBAC Model

10 predefined roles with CASL-based hybrid RBAC+ABAC:

1. Maintenance Technician
2. Production Operator
3. Supervisor
4. Store Keeper
5. Store Manager
6. Quality Manager
7. Procurement Officer
8. Procurement Manager
9. Plant Manager
10. System Admin

Permissions follow `{action}:{resource}:{scope}` format with ABAC conditions for value-based limits, department scoping, and hazmat clearance.

## Saudi Regulatory Compliance

| Framework | Integration |
|-----------|------------|
| SFDA | Feed additive registration, additive limits, Arabic labeling, recall management |
| ZATCA | 15% VAT, Fatoora Platform e-invoicing (Phase 2 B2B clearance), QR codes |
| PDPL | In-Kingdom data residency, consent management, breach notification |
| SASO/SABER | Conformity certificates, GHS-compliant SDS library |
| RCJY | Environmental reporting, hazardous waste documentation |
| Civil Defense | Fire safety scheduling, chemical separation, bilingual signage |

## Deployment

- **Container**: Docker Compose (dev), Kubernetes (prod)
- **Hosting**: STC Cloud or Azure Jeddah (Saudi data residency for PDPL)
- **Database**: PostgreSQL 16+ with connection pooling
- **Cache**: Redis 7 for sessions, pub/sub, BullMQ
- **CDN**: For static frontend assets
