import { useState, useMemo, useEffect } from "react";

export function usePagination(items = [], pageSize = 8, resetDeps = []) {
  const [currentPage, setCurrentPage] = useState(1);

  const safePageSize = Math.max(1, Number(pageSize) || 8);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safePageSize, ...resetDeps]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * safePageSize;
    return items.slice(startIndex, startIndex + safePageSize);
  }, [items, currentPage, safePageSize]);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    currentPage,
    totalPages,
    totalItems,
    paginatedItems,
    setCurrentPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}