import React from "react";
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

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
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

  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - 1, 1);
      const rightSiblingIndex = Math.min(currentPage + 1, totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3;
        for (let i = 1; i <= leftItemCount; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        const rightItemCount = 3;
        for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Page Button */}
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={clsx(
          "px-4 py-2 text-sm font-medium rounded-lg focus:outline-none",
          {
            "text-gray-400 cursor-not-allowed": currentPage === 1,
            "text-blue-600 hover:bg-blue-100": currentPage > 1,
          }
        )}
      >
        &lt; Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (typeof page === "string") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-4 py-2 text-sm text-gray-500"
            >
              {page}
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={clsx(
              "px-4 py-2 text-sm font-medium rounded-lg focus:outline-none",
              {
                "bg-blue-600 text-white": page === currentPage,
                "text-blue-600 hover:bg-blue-100": page !== currentPage,
              }
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={clsx(
          "px-4 py-2 text-sm font-medium rounded-lg focus:outline-none",
          {
            "text-gray-400 cursor-not-allowed": currentPage === totalPages,
            "text-blue-600 hover:bg-blue-100": currentPage < totalPages,
          }
        )}
      >
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
