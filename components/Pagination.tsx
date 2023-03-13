import { FC, useMemo } from "react";

const DOTS = "...";

interface PaginationProps {
    page: number;
    onChange: (page: number) => void;
    pageCount: number;
    siblingCount?: number;
}

const Pagination: FC<PaginationProps> = ({ page, onChange, pageCount, siblingCount = 1 }) => {
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
        <div className="flex rounded-lg border border-gray-700 w-fit overflow-hidden shrink-0">
            {pages.map((p, index) => (
                <button
                    key={index}
                    onClick={() => onChange(p as number)}
                    disabled={p === DOTS}
                    className={`flex items-center justify-center w-10 h-10 text-gray-50 disabled:bg-gray-700 disabled:hover:bg-gray-700
                        ${p === page ? "bg-red-500" : "bg-gray-900 hover:bg-gray-800"}
                    `}
                >
                    {p}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
