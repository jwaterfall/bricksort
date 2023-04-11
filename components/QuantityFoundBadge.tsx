import { FC } from 'react';

import Badge from './Badge';

interface QuantityFoundBadgeProps {
    quantity: number;
    quantityFound: number;
}

const QuantityFoundBadge: FC<QuantityFoundBadgeProps> = ({ quantity, quantityFound }) => {
    const getBadgeVariant = () => {
        if (quantityFound === quantity) {
            return 'success';
        } else if (quantityFound === 0) {
            return 'error';
        } else {
            return 'warning';
        }
    };

    return <Badge variant={getBadgeVariant()}>{`${quantityFound} of ${quantity} Found`}</Badge>;
};

export default QuantityFoundBadge;
