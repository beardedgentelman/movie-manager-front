import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxButtons = 5;
    const halfButtons = Math.floor(maxButtons / 2);
    let start = Math.max(1, page - halfButtons);
    let end = Math.min(totalPages, page + halfButtons);

    if (page <= halfButtons) {
      end = Math.min(totalPages, maxButtons);
    } else if (page + halfButtons >= totalPages) {
      start = Math.max(1, totalPages - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-transparent text-text rounded disabled:opacity-50"
      >
        Prev
      </button>

      {generatePageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`px-4 py-2 rounded ${pageNum === page ? 'bg-primary text-text' : 'bg-card text-text'}`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-transparent text-text rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
