import traerProductos from "../../API/django/traerproductos";
import { useEffect, useState } from "react";
import ItemGestion from "./itemGestion";
import FormProdLocal from "./forms/formProdLocal";
import updateProducto from "@/API/django/updateproducto";
import AlertaSimple from "../../alertas/alertasimple";
import IconoAgregar from "@/components/svg/iconoagregar";

const ListaProductosLocal = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  
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
    setModalAbierto(true);
  };

  const handleCrearNuevo = () => {
    setProductoSeleccionado(null);
    setModalAbierto(true);
  };

  const handleDelete = (id) => {
    console.log("Eliminar producto ID:", id);
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="lista-global">
      <div className="header-seccion-local">
        <h2>Envío Local</h2>
        <button className="btn-nuevo-producto" onClick={handleCrearNuevo}>
          <IconoAgregar width={18} height={18} />
          <span>Nuevo producto</span>
        </button>
      </div>

      <div className="productos-grid">
        {productos.map((producto) => (
          <ItemGestion
            key={producto.id}
            id={producto.id}
            description={producto.description}
            price={producto.price}
            image={producto.image}
            shipping={producto.shipping}
            OnEdit={handleEdit}
            OnDelete={handleDelete}
          />
        ))}
      </div>

      {modalAbierto && (
        <FormProdLocal
          initialData={productoSeleccionado}
          onSubmit={async (payload) => {
            try {
              if (productoSeleccionado) {
                await updateProducto(productoSeleccionado.id, payload);
                setAlertaMensaje("Producto actualizado con éxito");
              } else {
                // Lógica de alta para mañana
                setAlertaMensaje("Producto creado con éxito");
              }

              setModalAbierto(false);
              setProductoSeleccionado(null);

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