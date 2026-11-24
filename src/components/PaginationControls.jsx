const PaginationControls = ({
  currentPage,
  totalPages,
  pageSize,
  onPageSizeChange,
  hasPrevPage,
  hasNextPage,
  onPrev,
  onNext,
  options = [4, 8, 12, 16],
}) => {
  return (
    <div className="pagination-controls">
      <label>
        Por página:{" "}
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>

      {totalPages > 1 && (
        <>
          <button type="button" onClick={onPrev} disabled={!hasPrevPage}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button type="button" onClick={onNext} disabled={!hasNextPage}>
            Siguiente
          </button>
        </>
      )}
    </div>
  );
};

export default PaginationControls;