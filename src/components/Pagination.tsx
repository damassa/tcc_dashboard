interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4 gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
            page === currentPage
              ? "bg-purple-600 text-white cursor-not-allowed"
              : "bg-white text-black hover:bg-purple-200"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};