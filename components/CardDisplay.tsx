import { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import Pagination from './Pagination';

interface CardDisplayProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    pageCount: number;
    emptyTitle: string;
    emptySubtitle: string;
    FilterDropdown?: JSX.Element;
}

const CardDisplay: FC<PropsWithChildren<CardDisplayProps>> = ({ page, setPage, pageCount, emptyTitle, emptySubtitle, children, FilterDropdown }) => (
    <div className="flex flex-col gap-4">
        {(pageCount > 1 || FilterDropdown) && (
            <div className="flex items-center justify-between gap-4">
                <div>{pageCount > 1 && <Pagination page={page} setPage={setPage} pageCount={pageCount} />}</div>
                {FilterDropdown}
            </div>
        )}
        {pageCount > 0 ? (
            <>
                <div className="flex-1 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{children}</div>
                {pageCount > 1 && <Pagination page={page} setPage={setPage} pageCount={pageCount} />}
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
