export interface PaginationOptions {
    page?: number;
    limit?: number;
}

export interface UserOptions {
    user: string;
}

export interface PaginatedResult<T> {
    items: T[];
    currentPage: number;
    pageCount: number;
    nextPage?: number;
}

export function getSkipCount(page: number, limit: number) {
    return (page - 1) * limit;
}

export function getPageCount(totalCount: number, limit: number) {
    return Math.ceil(totalCount / limit);
}

export function getNextPage(currentPage: number, pageCount: number) {
    return currentPage < pageCount ? currentPage + 1 : undefined;
}
