import { useState, useEffect } from 'react';
import './nav.css';
import {getProducts} from '../API/firebase/firebaseservice.js';
import Item from './item.jsx';
import enchufe from '../assets/enchufe.png';
import Reload from './svg/reload';

const ItemListContainerFirebase = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProducts(); // Cambiado a la función de Firebase
            const productosMapeados = data.map(prod => ({
                ...prod,
                shipping: prod.shipping ?? null // Aseguramos que shipping tenga un valor por defecto si no está presente
            }));
            setProductos(productosMapeados);
        } catch (err) {
            setError(err.message || "Error al obtener los productos desde Firebase");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
                    <button onClick={fetchProductos} className="btn-reintentar">
                            <Reload height="30" width="30"/>
                    </button> 
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
                            shipping={prod.shipping} // Pasamos el valor de shipping al componente Item
                            favoritoInicial={false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemListContainerFirebase;