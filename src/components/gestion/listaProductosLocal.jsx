import traerProductos from "../../API/django/traerproductos";
import { useEffect, useState } from "react";
import ItemGestion from "./itemGestion";
import FormProdLocal from "./forms/formProdLocal";
import updateProducto from "@/API/django/updateproducto";
import createProducto from "@/API/django/createproducto";
import deleteProducto from "@/API/django/deleteproducto"; // <--- Importamos deleteProducto
import AlertaSimple from "../../alertas/alertasimple";
import IconoAgregar from "@/components/svg/iconoagregar";

const ListaProductosLocal = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modoEliminar, setModoEliminar] = useState(false); // <--- Estado para saber si estamos borrando
  
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
    setModoEliminar(false); // Nos aseguramos que no esté en modo eliminar
    setModalAbierto(true);
  };

  const handleCrearNuevo = () => {
    setProductoSeleccionado(null);
    setModoEliminar(false); // Nos aseguramos que no esté en modo eliminar
    setModalAbierto(true);
  };

  const handleDelete = (id) => {
    const productoAEliminar = productos.find((producto) => producto.id === id);
    setProductoSeleccionado(productoAEliminar);
    setModoEliminar(true); // <--- Activamos el modo eliminar para el modal
    setModalAbierto(true);
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
          modoEliminar={modoEliminar} // <--- Pasamos esta prop para que el formulario sepa si pinta rojo y cambia botones
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