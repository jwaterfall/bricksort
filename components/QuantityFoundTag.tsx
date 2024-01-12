import { FC } from 'react';

import { Badge } from '@/components/ui/badge';

interface QuantityFoundTagProps {
  quantity: number;
  quantityFound: number;
  showPercentage?: boolean;
}

const QuantityFoundTag: FC<QuantityFoundTagProps> = ({ quantity, quantityFound, showPercentage = false }) => {
  const getTagVariant = () => {
    if (quantityFound === quantity) return 'success';
    if (quantityFound === 0) return 'error';
    return 'warning';
  };

  return (
    <Badge color={getTagVariant()} className="w-fit">
      {showPercentage ? `${Math.round((quantityFound / quantity) * 100)}% Complete` : `${quantityFound} of ${quantity} Found`}
    </Badge>
  );
};

export default QuantityFoundTag;
