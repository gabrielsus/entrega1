import { useState, useEffect, useMemo } from 'react';
import './nav.css';
import traerProductos from '../API/django/traerproductos.js';
import Item from './item.jsx';
import enchufe from '../assets/enchufe.png';
import Reload from './svg/reload';
import { useSearch } from './search/searchcontext.jsx'; // ajustá la ruta según tu carpeta
import { usePagination } from '../hooks/usePagination.js'; // ajustá la ruta según tu carpeta
import PaginationControls from './PaginationControls.jsx'; // ajustá la ruta según tu carpeta
import Spinner from "@/spinner/spinner.jsx"; 
const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(8);
    const { searchTerm, selectedCategory } = useSearch();

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

    useEffect(() => {
        fetchProductos();
    }, []);

    const productosFiltrados = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        return productos.filter((prod) => {
            const texto = (prod.description ?? '').toLowerCase();
            const categoria = (prod.categoria ?? prod.category ?? '').trim().toLowerCase();

            const coincideBusqueda = !query || texto.includes(query);
            const coincideCategoria = !selectedCategory || categoria === selectedCategory.trim().toLowerCase();
            return coincideBusqueda && coincideCategoria;
        });
    }, [productos, searchTerm, selectedCategory]);

    const {
        currentPage,
        totalPages,
        paginatedItems,
        nextPage,
        prevPage,
        hasNextPage,
        hasPrevPage,
    } = usePagination(productosFiltrados, pageSize, [searchTerm, selectedCategory]);

    return (
        <div className="catalog-container">
            {loading && <Spinner texto="Cargando productos..." />}

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
                <>
                    <div className="productos-grid">
                        {paginatedItems.map((prod) => (
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

                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                        hasPrevPage={hasPrevPage}
                        hasNextPage={hasNextPage}
                        onPrev={prevPage}
                        onNext={nextPage}
                    />
                </>
            )}
        </div>
    );
};

export default ItemListContainer;