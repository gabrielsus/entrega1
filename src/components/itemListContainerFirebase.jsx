import { useState, useEffect, useMemo } from 'react';
import './nav.css';
import { getProducts } from '../API/firebase/firebaseservice.js';
import Item from './item.jsx';
import enchufe from '../assets/enchufe.png';
import Reload from './svg/reload';
import { useSearch } from './search/searchcontext.jsx'; // ajustá la ruta según tu carpeta

const ItemListContainerFirebase = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { searchTerm, selectedCategories } = useSearch();

    const fetchProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProducts();
            const productosMapeados = data.map(prod => ({
                ...prod,
                shipping: prod.shipping ?? null
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

    const productosFiltrados = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return productos.filter((prod) => {
            const texto = (prod.description ?? '').toLowerCase();
            const categoria = (prod.categoria ?? prod.category ?? '').trim().toLowerCase();

            const coincideBusqueda = !query || texto.includes(query);
            const coincideCategoria =
                selectedCategories.length === 0 || selectedCategories.includes(categoria);

            return coincideBusqueda && coincideCategoria;
        });
    }, [productos, searchTerm, selectedCategories]);

    return (
        <div className="catalog-container">
            {loading && <p>Cargando productos...</p>}

            {error && (
                <div className="error-enchufe">
                    <img src={enchufe} alt='Sin Conexión' className='error-imagen' />
                    <h2>¡Ups!</h2>
                    <p>No hay conexión con el servidor.</p>
                    <button onClick={fetchProductos} className="btn-reintentar">
                        <Reload height="30" width="30" />
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className="productos-grid">
                    {productosFiltrados.map((prod) => (
                        <Item
                            key={prod.id}
                            id={prod.id}
                            description={prod.description}
                            price={prod.price}
                            image={prod.image}
                            shipping={prod.shipping}
                            favoritoInicial={false}
                            esInternacional={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemListContainerFirebase;