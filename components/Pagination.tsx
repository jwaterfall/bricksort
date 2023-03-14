import { FC } from "react";

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    pageCount: number;
}

const Pagination: FC<PaginationProps> = ({ page, setPage: onChange, pageCount }) => (
    <div className="btn-group">
        <button className={`btn ${page === 1 ? "btn-disabled" : ""}`} disabled={page === 1} onClick={() => onChange(page - 1)}>
            «
        </button>
        <button className="btn ">
            Page {page} of {pageCount}
        </button>
        <button className={`btn ${page >= pageCount ? "btn-disabled" : ""}`} disabled={page >= pageCount} onClick={() => onChange(page + 1)}>
            »
        </button>
    </div>
);

export default Pagination;
