import { Dispatch, FC, SetStateAction, useMemo } from 'react';

import Button, { ButtonSize } from './actions/Button';

const DOTS = '...';

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageCount: number;
  size?: ButtonSize;
  siblingCount?: number;
}

const Pagination: FC<PaginationProps> = ({ page, setPage, pageCount, size, siblingCount = 1 }) => {
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

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'gap-1';
      case 'md':
        return 'gap-2';
      case 'lg':
        return 'gap-4';
    }
  };

  return (
    <div className={`flex group pagination w-fit ${getSizeStyles()}`}>
      {pages.map((p, index) => (
        <Button
          key={index}
          size={size}
          shape="square"
          onClick={() => setPage(p as number)}
          color={p === page ? 'primary' : 'default'}
          disabled={p === DOTS}
        >
          {p}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
