import { FC } from 'react';

import Badge from './display/Badge';

interface QuantityFoundBadgeProps {
    quantity: number;
    quantityFound: number;
    showPercentage?: boolean;
}

const QuantityFoundBadge: FC<QuantityFoundBadgeProps> = ({ quantity, quantityFound, showPercentage = false }) => {
    const getBadgeColor = () => {
        if (quantityFound === quantity) {
            return 'success';
        } else if (quantityFound === 0) {
            return 'error';
        } else {
            return 'warning';
        }
    };

    return (
        <Badge color={getBadgeColor()}>
            {showPercentage ? `${Math.round((quantityFound / quantity) * 100)}% Complete` : `${quantityFound} of ${quantity} Found`}
        </Badge>
    );
};

export default QuantityFoundBadge;
