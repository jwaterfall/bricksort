import { ButtonHTMLAttributes, FC, useMemo } from 'react';
import { IconType } from 'react-icons';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const DOTS = '...';

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    icon?: IconType;
}

const PaginationButton: FC<PaginationButtonProps> = ({ active = false, children, icon: Icon, ...props }) => (
    <button
        {...props}
        className={`h-8 aspect-square inline-flex items-center justify-center select-none transition-colors duration-100 rounded-full disabled:opacity-25 text-sm ${
            active
                ? 'text-zinc-50 bg-red-500 hover:bg-red-700 disabled:hover:bg-red-500 dark:text-red-950 dark:bg-red-400 dark:hover:bg-red-300 dark:disabled:hover:bg-red-400'
                : 'bg-transparent text-zinc-800 hover:bg-zinc-200 disabled:hover:bg-transparent dark:text-zinc-200 dark:hover:bg-zinc-800 dark:disabled:hover:bg-transparent'
        }`}
    >
        {Icon ? <Icon size={18} className="shrink-0" /> : children}
    </button>
);

interface PaginationProps {
    page: number;
    onChange: (page: number) => void;
    pageCount: number;
    siblingCount?: number;
    disabled?: boolean;
}

export const Pagination: FC<PaginationProps> = ({ page, onChange, pageCount, siblingCount = 1, disabled = false }) => {
    const createRange = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

    const pages: (typeof DOTS | number)[] = useMemo(() => {
        if (pageCount <= 2 * siblingCount + 5) {
            return createRange(1, pageCount);
        }

        const leftSiblingIndex = Math.max(page - siblingCount, 1);
        const rightSiblingIndex = Math.min(page + siblingCount, pageCount);

        const shouldShowLeftDots = leftSiblingIndex > 3;
        const shouldShowRightDots = rightSiblingIndex < pageCount - 2;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = createRange(1, leftItemCount);

            return [...leftRange, DOTS, pageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = createRange(pageCount - rightItemCount + 1, pageCount);

            return [1, DOTS, ...rightRange];
        }

        const middleRange = createRange(leftSiblingIndex, rightSiblingIndex);
        return [1, DOTS, ...middleRange, DOTS, pageCount];
    }, [page, pageCount, siblingCount]);

    return (
        <div className="flex group pagination w-fit gap-1">
            <PaginationButton onClick={() => onChange(page - 1)} disabled={disabled || page <= 1} icon={MdChevronLeft} />
            {pages.map((p, index) => {
                if (p === DOTS) {
                    return (
                        <div
                            key={index}
                            className={`
                                flex items-center justify-center w-8 h-8 text-zinc-800 dark:text-zinc-200 select-none
                                ${disabled ? 'opacity-25' : ''}
                            `}
                        >
                            {DOTS}
                        </div>
                    );
                }

                return (
                    <PaginationButton key={index} onClick={() => onChange(p)} active={p === page} disabled={disabled}>
                        {p}
                    </PaginationButton>
                );
            })}
            <PaginationButton onClick={() => onChange(page + 1)} disabled={disabled || page >= pageCount} icon={MdChevronRight} />
        </div>
    );
};
