import { FC } from "react";

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    pageCount: number;
    disabled?: boolean;
}

const Pagination: FC<PaginationProps> = ({ page, setPage: onChange, pageCount, disabled }) => (
    <div className="btn-group">
        <button className={`btn ${page === 1 ? "btn-disabled" : ""}`} disabled={disabled || page === 1} onClick={() => onChange(page - 1)}>
            «
        </button>
        <button className="btn" disabled={disabled}>
            Page {page} of {pageCount}
        </button>
        <button
            className={`btn ${page >= pageCount ? "btn-disabled" : ""}`}
            disabled={disabled || page >= pageCount}
            onClick={() => onChange(page + 1)}
        >
            »
        </button>
    </div>
);

export default Pagination;
