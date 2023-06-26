import { useMemo } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { PaginatedResult, PaginationOptions } from '@/utils/pagination';

export function useInfinitePaginatedItems<T, O extends PaginationOptions>(url: string, initialData: PaginatedResult<T>, options: O) {
    const response = useInfiniteQuery<PaginatedResult<T>>(
        [url, options],
        async ({ pageParam = 1 }) => {
            const response = await axios.post(url, { ...options, page: pageParam });
            return response.data;
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextPage,
            initialData: {
                pages: [initialData],
                pageParams: [1],
            },
        }
    );

    const items = useMemo(() => response.data?.pages.flatMap((page) => page.items), [response.data]);
    return { ...response, items };
}

export function useInfiniteScrolling(fetchNextPage: () => void) {
    const { ref } = useInView({
        onChange: (inView) => {
            if (inView) fetchNextPage();
        },
    });

    return ref;
}
