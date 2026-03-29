import React from 'react';
import { useAbility } from '../../hooks/useAbility';

interface PermissionGateProps {
  action: string;
  subject: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PermissionGate: React.FC<PermissionGateProps> = ({
  action,
  subject,
  children,
  fallback = null,
}) => {
  const ability = useAbility();

  if (ability.can(action as any, subject as any)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};

export default PermissionGate;
