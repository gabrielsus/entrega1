import traerProductos from "@/API/firebase/traerproductos";
import { useEffect, useState } from "react";
import ItemGestion from "./itemGestion";
import FormProdInternacional from "./forms/formProdInternacional";
import createProducto from "@/API/firebase/createproducto";
import updateProducto from "@/API/firebase/updateproducto";
import deleteProducto from "@/API/firebase/deleteproducto";
import AlertaSimple from "../../alertas/alertasimple.jsx";
import IconoAgregar from "@/components/svg/iconoagregar";
import categoriasData from "@/data/categories.json";
import { useSearch } from "@/components/search/searchcontext.jsx";
import { usePagination } from "@/hooks/usePagination.js"; // ajustá si está en otra carpeta
import PaginationControls from "@/components/PaginationControls.jsx"; // ajustá si está en otra carpeta

const ListaProductosInternacional = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [pageSize, setPageSize] = useState(8);
  const { searchTerm } = useSearch();

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

  if (loading) return <div>Cargando productos internacionales...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="lista-global">
      <div className="header-seccion-local">
        <h2>Envío Internacional</h2>
        <div className="filtro-gestion-categoria">
          <label htmlFor="filtroCatInt">Categoría: </label>
          <select
            id="filtroCatInt"
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
        <FormProdInternacional
          initialData={productoSeleccionado}
          modoEliminar={modoEliminar}
          onSubmit={async (payload) => {
            try {
              if (modoEliminar) {
                await deleteProducto(productoSeleccionado.id);
                setAlertaMensaje("Producto internacional eliminado con éxito");
              } else if (productoSeleccionado) {
                await updateProducto(productoSeleccionado.id, payload);
                setAlertaMensaje("Producto internacional actualizado con éxito");
              } else {
                await createProducto(payload);
                setAlertaMensaje("Producto internacional creado con éxito");
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

export default ListaProductosInternacional;