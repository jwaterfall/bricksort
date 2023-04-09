import { FC, PropsWithChildren } from 'react';
import Pagination from './Pagination';

interface CardDisplayProps {
    page: number;
    setPage: (page: number) => void;
    pageCount: number;
    emptyTitle: string;
    emptySubtitle: string;
    FilterDropdown?: JSX.Element;
}

const CardDisplay: FC<PropsWithChildren<CardDisplayProps>> = ({ page, setPage, pageCount, emptyTitle, emptySubtitle, children, FilterDropdown }) => (
    <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <div>{pageCount > 0 && <Pagination page={page} setPage={setPage} pageCount={pageCount} disabled={pageCount <= 0} />}</div>
            {FilterDropdown}
        </div>
        {pageCount > 0 ? (
            <>
                <div className="flex-1 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {children}
                </div>
                <Pagination page={page} setPage={setPage} pageCount={pageCount} disabled={pageCount <= 0} />
            </>
        ) : (
            <div className="h-96 flex flex-col gap-2 justify-center items-center">
                <h2 className="text-2xl font-bold">{emptyTitle}</h2>
                <h3 className="font-medium text-center">{emptySubtitle}</h3>
            </div>
        )}
    </div>
);

export default CardDisplay;
