import { FC } from 'react';

import Tag from './display/Tag';

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
    <Tag color={getTagVariant()}>
      {showPercentage ? `${Math.round((quantityFound / quantity) * 100)}% Complete` : `${quantityFound} of ${quantity} Found`}
    </Tag>
  );
};

export default QuantityFoundTag;
