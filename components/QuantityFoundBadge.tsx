import { FC } from 'react';

import Badge from './display/Badge';

interface QuantityFoundBadgeProps {
    quantity: number;
    quantityFound: number;
}

const QuantityFoundBadge: FC<QuantityFoundBadgeProps> = ({ quantity, quantityFound }) => {
    const getBadgeColor = () => {
        if (quantityFound === quantity) {
            return 'success';
        } else if (quantityFound === 0) {
            return 'error';
        } else {
            return 'warning';
        }
    };

    return <Badge color={getBadgeColor()}>{`${quantityFound} of ${quantity} Parts Found`}</Badge>;
};

export default QuantityFoundBadge;
