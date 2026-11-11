import traerProductos from "@/API/firebase/traerproductos";
import { useEffect, useState } from "react";
import ItemGestion from "./itemGestion";
import FormProdInternacional from "./forms/formProdInternacional";
import createProducto from "@/API/firebase/createproducto";
import updateProducto from "@/API/firebase/updateproducto";
import deleteProducto from "@/API/firebase/deleteproducto";
import AlertaSimple from "../../alertas/alertasimple.jsx";
import IconoAgregar from "@/components/svg/iconoagregar";


const ListaProductosInternacional = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Cargando productos internacionales...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="lista-global">
      <div className="header-seccion-local">
        <h2>Envío Internacional</h2>
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
            category={producto.category} // Aprovechamos el nuevo campo
            OnEdit={handleEdit}
            OnDelete={handleDelete}
          />
        ))}
      </div>

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

              // Recargamos la lista desde Firestore
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