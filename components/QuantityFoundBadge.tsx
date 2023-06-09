import { FC } from 'react';

import Badge from './display/Badge';

interface QuantityFoundBadgeProps {
  quantity: number;
  quantityFound: number;
  showPercentage?: boolean;
}

const QuantityFoundBadge: FC<QuantityFoundBadgeProps> = ({ quantity, quantityFound, showPercentage = false }) => {
  const getBadgeVariant = () => {
    if (quantityFound === quantity) return 'success';
    if (quantityFound === 0) return 'error';
    return 'warning';
  };

  return (
    <Badge color={getBadgeVariant()}>
      {showPercentage ? `${Math.round((quantityFound / quantity) * 100)}% Complete` : `${quantityFound} of ${quantity} Found`}
    </Badge>
  );
};

export default QuantityFoundBadge;
