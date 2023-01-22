import { FC, useMemo } from "react";

import Button, { ButtonSize } from "../actions/Button";
import ButtonGroup from "../layout/ButtonGroup";

const DOTS = "...";

interface PaginationProps {
    page: number;
    onChange: (page: number) => void;
    pageCount: number;
    size?: ButtonSize;
    siblingCount?: number;
}

const Pagination: FC<PaginationProps> = ({ page, onChange, pageCount, size, siblingCount = 1 }) => {
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
        <ButtonGroup>
            {pages.map((p, index) => (
                <Button
                    key={index}
                    size={size}
                    shape="square"
                    onClick={() => onChange(p as number)}
                    color={p === page ? "primary" : "default"}
                    disabled={p === DOTS}
                >
                    {p}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default Pagination;
