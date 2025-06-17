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
    <div className="flex justify-center items-center flex-wrap gap-2 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-gray-100 hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {start > 1 && (
        <span className="px-2 text-gray-500 font-semibold select-none">
          ...
        </span>
      )}

      {pageNumbers.map((number) => {
        return (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
            ${
              currentPage === number
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            {number}
          </button>
        );
      })}

      {end < totalPages && (
        <span className="px-2 text-gray-500 font-semibold select-none">
          ...
        </span>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-gray-100 hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};
