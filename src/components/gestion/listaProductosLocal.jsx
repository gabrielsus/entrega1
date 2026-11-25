import traerProductos from "../../API/django/traerproductos";
import { useEffect, useState } from "react";
import ItemGestion from "./itemGestion";
import FormProdLocal from "./forms/formProdLocal";
import updateProducto from "@/API/django/updateproducto";
import createProducto from "@/API/django/createproducto";
import deleteProducto from "@/API/django/deleteproducto";
import AlertaSimple from "../../alertas/alertasimple";
import IconoAgregar from "@/components/svg/iconoagregar";
import categoriasData from "@/data/categories.json";
import { useSearch } from "@/components/search/searchcontext.jsx";
import { usePagination } from "@/hooks/usePagination.js"; 
import PaginationControls from "@/components/PaginationControls.jsx"; 
import Spinner from "@/spinner/spinner.jsx"; 

const ListaProductosLocal = () => {
  const { searchTerm } = useSearch();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [pageSize, setPageSize] = useState(8);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modoEliminar, setModoEliminar] = useState(false);

  const [alertaMensaje, setAlertaMensaje] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await traerProductos();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleEdit = (id) => {
    const productoAEditar = productos.find((producto) => producto.id === id);
    setProductoSeleccionado(productoAEditar);
    setModoEliminar(false);
    setModalAbierto(true);
  };

  const handleCrearNuevo = () => {
    setProductoSeleccionado(null);
    setModoEliminar(false);
    setModalAbierto(true);
  };

  const handleDelete = (id) => {
    const productoAEliminar = productos.find((producto) => producto.id === id);
    setProductoSeleccionado(productoAEliminar);
    setModoEliminar(true);
    setModalAbierto(true);
  };

  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria =
      categoriaFiltro === "Todas" ||
      (prod.category ?? prod.categoria ?? "General").trim().toLowerCase() ===
        categoriaFiltro.toLowerCase();

    const texto = (searchTerm ?? "").trim().toLowerCase();
    const coincideTexto =
      !texto ||
      (prod.description ?? "").toLowerCase().includes(texto) ||
      (prod.category ?? prod.categoria ?? "").toLowerCase().includes(texto);

    return coincideCategoria && coincideTexto;
  });

  const {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(productosFiltrados, pageSize, [categoriaFiltro, searchTerm]);

  if (loading) return <Spinner texto="Cargando productos..." />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="lista-global">
      <div className="header-seccion-local">
        <h2>Envío Local</h2>
        <div className="filtro-gestion-categoria">
          <label htmlFor="filtroCatLocal">Categoría: </label>
          <select
            id="filtroCatLocal"
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="Todas">Todas</option>
            {categoriasData.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button className="btn-nuevo-producto" onClick={handleCrearNuevo}>
          <IconoAgregar width={18} height={18} />
          <span>Nuevo producto</span>
        </button>
      </div>

      <div className="productos-grid">
        {paginatedItems.map((producto) => (
          <ItemGestion
            key={producto.id}
            id={producto.id}
            description={producto.description}
            price={producto.price}
            image={producto.image}
            shipping={producto.shipping}
            category={producto.category}
            OnEdit={handleEdit}
            OnDelete={handleDelete}
          />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        onPrev={prevPage}
        onNext={nextPage}
      />

      {modalAbierto && (
        <FormProdLocal
          initialData={productoSeleccionado}
          modoEliminar={modoEliminar}
          onSubmit={async (payload) => {
            try {
              if (modoEliminar) {
                await deleteProducto(productoSeleccionado.id);
                setAlertaMensaje("Producto eliminado con éxito");
              } else if (productoSeleccionado) {
                await updateProducto(productoSeleccionado.id, payload);
                setAlertaMensaje("Producto actualizado con éxito");
              } else {
                await createProducto(payload);
                setAlertaMensaje("Producto creado con éxito");
              }

              setModalAbierto(false);
              setProductoSeleccionado(null);
              setModoEliminar(false);

              const dataActualizada = await traerProductos();
              setProductos(dataActualizada);
            } catch (error) {
              console.error("Error al procesar el producto:", error);
              setAlertaMensaje("Hubo un error al procesar el producto.");
            }
          }}
          onCancel={() => {
            setModalAbierto(false);
            setProductoSeleccionado(null);
            setModoEliminar(false);
          }}
        />
      )}

      {alertaMensaje && (
        <AlertaSimple
          mensaje={alertaMensaje}
          onCerrar={() => setAlertaMensaje(null)}
        />
      )}
    </div>
  );
};

export default ListaProductosLocal;