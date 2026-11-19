import "./searchbar.css";
import { useSearch } from "./searchcontext"; // ajustá la ruta según tu carpeta

export default function FiltroBusqueda({ availableCategories = [] }) {
  const { searchTerm, setSearchTerm, selectedCategories, toggleCategory, clearFilters } = useSearch();

  return (
    <div className="filtro-busqueda">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="filtro-busqueda__input"
      />

      {availableCategories.length > 0 && (
        <div className="filtro-busqueda__categorias">
          <span className="filtro-busqueda__label">Categorías:</span>
          {availableCategories.map((cat) => {
            const normalized = cat.trim().toLowerCase();
            const checked = selectedCategories.includes(normalized);
            return (
              <label key={cat} className="filtro-busqueda__opcion">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            );
          })}
        </div>
      )}

      {(searchTerm || selectedCategories.length > 0) && (
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