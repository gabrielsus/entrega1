import { useState, useEffect } from 'react';
import './nav.css';
import traerProductos from '../API/traerproductos.js';
import Item from './item.jsx';

const Nav = () => {
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
                    <svg 
                        width="64" 
                        height="64" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        {/* Acá irían las líneas de tu enchufe o un ícono representativo */}
                        <path d="M18 10h-1V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4H6a2 2 0 0 0-2 2v2a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-2a2 2 0 0 0-2-2z"></path>
                        <line x1="10" y1="12" x2="14" y2="12"></line>
                    </svg>
                    <p>¡Ups! Sin conexión con el servidor.</p>
                </div>
            )} 

            {!loading && !error && (
                <div className="productos-grid">
                    {productos.map((prod) => (
                        <Item 
                            key={prod.id}
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

export default Nav;