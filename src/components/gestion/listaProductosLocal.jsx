import traerProductos from "../../API/django/traerproductos";
import { useEffect, useState } from "react";
import ItemGestion from "./itemGestion";
import FormProdLocal from "./forms/formProdLocal";
import updateProducto from "../../API/django/updateproducto";
import AlertaSimple from "../../alertas/alertasimple";

const ListaProductosLocal = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  
  // Estado para manejar la apertura y el texto de la alerta propia
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

  const handleDelete = (id) => {
    console.log("Eliminar producto ID:", id);
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="lista-global">
      <h2>Envío Local</h2>
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

      {/* Modal para editar el producto */}
      {modalAbierto && (
        <FormProdLocal
          initialData={productoSeleccionado}
          onSubmit={async (updatedData) => {
            try {
              await updateProducto(productoSeleccionado.id, updatedData);
              setModalAbierto(false);
              setProductoSeleccionado(null);
              
              // Acá activamos la alerta propia en lugar del window.alert
              setAlertaMensaje("Producto actualizado con éxito");

            } catch (error) {
              console.error("Error al actualizar el producto:", error);
              setAlertaMensaje("Hubo un error al actualizar el producto.");
            }
          }}
          onCancel={() => {
            setModalAbierto(false);
            setProductoSeleccionado(null);
          }}
        />
      )}

      {/* Modal de Alerta condicional (se abre cuando alertaMensaje tiene texto) */}
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