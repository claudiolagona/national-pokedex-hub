export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  visiblePages = 5,
}) => {
  const pageNumbers = [];

  const half = Math.floor(visiblePages / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (end - start + 1 < visiblePages) {
    if (start === 1) {
      end = Math.min(totalPages, start + visiblePages - 1);
    } else if (end === totalPages) {
      start = Math.max(1, end - visiblePages + 1);
    }
  }

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>

      {start > 1 && <span className="px-2">...</span>}

      {pageNumbers.map((number) => {
        return (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-2 rounded cursor-pointer ${
              currentPage === number ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {number}
          </button>
        );
      })}

      {end < totalPages && <span className="px-2">...</span>}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};
