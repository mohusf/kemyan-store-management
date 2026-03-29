import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

const LazyFallback = (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <Spin size="large" />
  </div>
);

function lazy(factory: () => Promise<{ default: React.ComponentType }>) {
  const Component = React.lazy(factory);
  return (
    <Suspense fallback={LazyFallback}>
      <Component />
    </Suspense>
  );
}

const Login = () => lazy(() => import('../pages/Login'));
const Dashboard = () => lazy(() => import('../pages/Dashboard'));
const MaterialList = () => lazy(() => import('../pages/materials/MaterialList'));
const MaterialDetail = () => lazy(() => import('../pages/materials/MaterialDetail'));
const RequisitionList = () => lazy(() => import('../pages/requisitions/RequisitionList'));
const RequisitionForm = () => lazy(() => import('../pages/requisitions/RequisitionForm'));
const PurchaseOrderList = () => lazy(() => import('../pages/procurement/PurchaseOrderList'));
const GoodsReceivedNote = () => lazy(() => import('../pages/procurement/GoodsReceivedNote'));
const InventoryOverview = () => lazy(() => import('../pages/inventory/InventoryOverview'));
const TransactionHistory = () => lazy(() => import('../pages/inventory/TransactionHistory'));
const BatchList = () => lazy(() => import('../pages/inventory/BatchList'));
const WarehouseMap = () => lazy(() => import('../pages/warehouse/WarehouseMap'));
const SupplierList = () => lazy(() => import('../pages/suppliers/SupplierList'));
const SupplierDetail = () => lazy(() => import('../pages/suppliers/SupplierDetail'));
const InspectionList = () => lazy(() => import('../pages/quality/InspectionList'));
const NCRList = () => lazy(() => import('../pages/quality/NCRList'));
const SDSLibrary = () => lazy(() => import('../pages/compliance/SDSLibrary'));
const WasteTracking = () => lazy(() => import('../pages/compliance/WasteTracking'));
const DocumentList = () => lazy(() => import('../pages/documents/DocumentList'));
const ReportDashboard = () => lazy(() => import('../pages/reports/ReportDashboard'));
const AuditLog = () => lazy(() => import('../pages/audit/AuditLog'));
const Settings = () => lazy(() => import('../pages/settings/Settings'));

const basename = import.meta.env.BASE_URL || '/';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'materials', element: <MaterialList /> },
      { path: 'materials/:id', element: <MaterialDetail /> },
      { path: 'requisitions', element: <RequisitionList /> },
      { path: 'requisitions/new', element: <RequisitionForm /> },
      { path: 'requisitions/:id', element: <RequisitionForm /> },
      { path: 'procurement/orders', element: <PurchaseOrderList /> },
      { path: 'procurement/orders/:id', element: <PurchaseOrderList /> },
      { path: 'procurement/grn', element: <GoodsReceivedNote /> },
      { path: 'inventory', element: <InventoryOverview /> },
      { path: 'inventory/transactions', element: <TransactionHistory /> },
      { path: 'inventory/batches', element: <BatchList /> },
      { path: 'warehouse', element: <WarehouseMap /> },
      { path: 'warehouse/locations', element: <WarehouseMap /> },
      { path: 'suppliers', element: <SupplierList /> },
      { path: 'suppliers/:id', element: <SupplierDetail /> },
      { path: 'quality/inspections', element: <InspectionList /> },
      { path: 'quality/ncr', element: <NCRList /> },
      { path: 'compliance/sds', element: <SDSLibrary /> },
      { path: 'compliance/waste', element: <WasteTracking /> },
      { path: 'documents', element: <DocumentList /> },
      { path: 'reports', element: <ReportDashboard /> },
      { path: 'audit-log', element: <AuditLog /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
], { basename });
