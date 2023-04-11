import { FC, PropsWithChildren } from 'react';

interface BadgeProps {
    variant?: 'success' | 'warning' | 'error';
}

const Badge: FC<PropsWithChildren<BadgeProps>> = ({ variant, children }) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
                return 'bg-green-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'error':
                return 'bg-red-500';
            default:
                return 'bg-slate-200 text-slate-950 border border-slate-300 font-semibold';
        }
    };

    return <span className={`w-fit px-2 py-1 rounded-lg text-xs text-slate-50 font-medium ${getVariantStyles()}`}>{children}</span>;
};

export default Badge;
