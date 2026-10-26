import traerProductos from "../../API/django/traerproductos";
import { useEffect, useState } from "react";
import ItemGestion from "./itemGestion";

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

 const handleEdit = (id) => {
    console.log("Editar producto ID:", id);
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
    </div>
  );
};

export default ListaProductosLocal;