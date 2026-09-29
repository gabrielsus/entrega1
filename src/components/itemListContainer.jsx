import { useState, useEffect } from 'react';
import './nav.css';
import traerProductos from '../API/traerproductos.js';
import Item from './item.jsx';
import "./errorservidor.css";
const ItemListContainer = () => {
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

    return (
        <div className="catalog-container">
            {loading && <p>Cargando productos...</p>}

            {error && (
                <div className="error-enchufe">
                    <img src={enchufe} alt = 'Sin Conexión' className='error-imagen'/>
                    <h2>¡Ups!</h2>
                    <p>No hay conexión con el servidor.</p>
                </div>
            )} 

            {!loading && !error && (
                <div className="productos-grid">
                    {productos.map((prod) => (
                        <Item 
                            key={prod.id}
                            id={prod.id}
                            description={prod.description}
                            price={prod.price}
                            image={prod.image}
                            favoritoInicial={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemListContainer;