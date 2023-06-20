export interface PaginatedOptions {
    page?: number | undefined;
    limit?: number | undefined;
}

export interface PaginatedResult<T> {
    items: T[];
    page: number;
    pageCount: number;
}

export function getSkipCount(page: number, limit: number) {
    return (page - 1) * limit;
}

export function getPageCount(totalCount: number, limit: number) {
    return Math.ceil(totalCount / limit);
}
