import { Tag } from 'antd';
import React from 'react';
import { getSaleStatus } from 'src/utils/get-sale-status';

export type ISaleStatusBadgeProps = {
  status?: string;
  icon?: boolean;
}

const SaleStatusBadge: React.FC<ISaleStatusBadgeProps> = ({
  status,
  icon: _icon = true
}) => {
  const { icon, label, color } = getSaleStatus(status);
  return <Tag icon={_icon ? icon : null} color={color}>
    {label}
  </Tag>;
}

export default SaleStatusBadge;
