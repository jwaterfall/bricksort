import axios from 'axios';
import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { FaCar, FaPuzzlePiece } from 'react-icons/fa';

import useStatistics from '../queries/useStatistics';

const HomePage: NextPage = () => {
    const { data, isLoading } = useStatistics();

    if (isLoading || !data) return null;

    const { setCount, totalPartQuantity, totalPartQuantityFound } = data;

    return (
        <div className="stats stats-vertical shadow w-full">
            <div className="stat">
                <div className="stat-figure text-primary">
                    <FaCar className="w-8 h-8" />
                </div>
                <div className="stat-title">Sets in your collection</div>
                <div className="stat-value text-primary">{setCount}</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <FaPuzzlePiece className="w-8 h-8" />
                </div>
                <div className="stat-title">Parts found</div>
                <div className="stat-value text-secondary">{Math.round((totalPartQuantityFound / totalPartQuantity) * 100)}%</div>
                <div className="stat-desc">
                    {totalPartQuantityFound} of {totalPartQuantity}
                </div>
            </div>
        </div>
    );
};

export default withPageAuthRequired(HomePage);
