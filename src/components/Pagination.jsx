import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
    }

    return (
        <div className="pagination">

            {/* Previous */}
            <button
                type="button"
                className="pagination-button pagination-arrow"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <ChevronLeft size={18} />
            </button>


            {/* Page numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    type="button"
                    className={`pagination-button ${
                        currentPage === page ? "active" : ""
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}


            {/* Next */}
            <button
                type="button"
                className="pagination-button pagination-arrow"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <ChevronRight size={18} />
            </button>

        </div>
    );
}

export default Pagination;