import { clsx } from "clsx";

type PaginationProps = {
  /**
   * The current page number.
   */
  currentPage: number;

  /**
   * The total number of pages.
   */
  totalPages: number;

  /**
   * A callback that is triggered when a page is clicked.
   */
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Page Button */}
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={clsx(
          "px-4 py-2 text-sm font-medium rounded-lg",
          {
            "text-gray-400 cursor-not-allowed": currentPage === 1,
            "text-blue-600 hover:bg-blue-100": currentPage > 1,
          },
          "focus:outline-none"
        )}
      >
        &lt; Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={clsx(
            "px-4 py-2 text-sm font-medium rounded-lg",
            {
              "bg-blue-600 text-white": page === currentPage,
              "text-blue-600 hover:bg-blue-100": page !== currentPage,
            },
            "focus:outline-none"
          )}
        >
          {page}
        </button>
      ))}
      {/* Next Page Button */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={clsx(
          "px-4 py-2 text-sm font-medium rounded-lg",
          {
            "text-gray-400 cursor-not-allowed": currentPage === totalPages,
            "text-blue-600 hover:bg-blue-100": currentPage < totalPages,
          },
          "focus:outline-none"
        )}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
