export interface PaginationOptions {
    page?: number;
    limit?: number;
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
