function Pagination({ page, pages, setPage }) {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-4 py-2 rounded 
            ${page === i + 1
              ? "bg-indigo-600 text-white"
              : "bg-gray-200"}
          `}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;