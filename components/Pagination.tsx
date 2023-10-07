import { Dispatch, FC, SetStateAction, useMemo } from 'react';

const DOTS = '...';

interface PaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pageCount: number;
  siblingCount?: number;
}

const Pagination: FC<PaginationProps> = ({ page, setPage, pageCount, siblingCount = 1 }) => {
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
    <div className="flex gap-2 w-fit">
      {pages.map((p, index) => (
        <button
          key={index}
          onClick={() => setPage(p as number)}
          disabled={p === DOTS}
          className={`text-sm h-8 aspect-square flex items-center justify-center rounded-sm font-medium ${
            p === page ? 'text-green-600 border border-current' : 'hover:text-green-600 text-zinc-950 disabled:text-zinc-500'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
