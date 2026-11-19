import { createContext, useContext, useState } from "react";
import categoriasData from "@/data/categories.json";

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  return (
    <SearchContext.Provider
      value={{
        categories: categoriasData,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        clearFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);