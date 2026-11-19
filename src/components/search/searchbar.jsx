import "./searchbar.css";
import { useSearch } from "./searchcontext";

export default function FiltroBusqueda() {
  const {
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    clearFilters,
  } = useSearch();

  return (
    <div className="filtro-busqueda">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="filtro-busqueda__input"
      />

      <div className="filtro-busqueda__categorias">
        <span className="filtro-busqueda__label">Categorías:</span>

        <label className="filtro-busqueda__opcion">
          <input
            type="radio"
            name="categoriaFiltro"
            value=""
            checked={selectedCategory === ""}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <span>Todas</span>
        </label>

        {categories.map((cat) => (
          <label key={cat} className="filtro-busqueda__opcion">
            <input
              type="radio"
              name="categoriaFiltro"
              value={cat}
              checked={selectedCategory === cat}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      {(searchTerm || selectedCategory !== "") && (
        <button
          type="button"
          onClick={clearFilters}
          className="filtro-busqueda__limpiar"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}