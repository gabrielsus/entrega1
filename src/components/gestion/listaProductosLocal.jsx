import traerProductos from "../../API/django/traerproductos";
import { useEffect, useState } from "react";
import ItemGestion from "./itemGestion";
import FormProdLocal from "./forms/formProdLocal";
import updateProducto from "../../API/django/updateproducto";

const ListaProductosLocal = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
 const [modalAbierto, setModalAbierto] = useState(false);
 const [productoSeleccionado, setProductoSeleccionado] = useState(null);
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
            description={producto.description} // Mapeás 'nombre' de Django a 'description'
            price={producto.price}       // Mapeás 'precio' a 'price'
            image={producto.image}       // Asegurate que el campo en Django se llame así o ajustalo
            shipping={producto.shipping}     // El campo de envío que devuelva tu API
            OnEdit={handleEdit}
            OnDelete={handleDelete}
          />
        ))}
      </div>
      {/*Aquí agrego el modal para editar el producto*/}
{/* Aquí agrego el modal para editar el producto de forma condicional */}
      {modalAbierto && (
        <FormProdLocal
          initialData={productoSeleccionado}
          onSubmit={async(updatedData) => {
                          await updateProducto(productoSeleccionado.id, updatedData)
          }}
          onCancel={() => {
            setModalAbierto(false);
            setProductoSeleccionado(null);
          }}
        />
      )}
    </div>
  );
};

export default ListaProductosLocal;