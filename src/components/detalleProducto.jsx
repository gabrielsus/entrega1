import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import traerProductoPorId from "../API/traerunproducto.js"; // Importamos el servicio que acabamos de crear
import { svgPlaceholder } from "./svg/svgPlaceHolder";
import './nav.css';
import '/globals.css';

const DetalleProducto = () => {
    const { id } = useParams(); // 1. Capturamos el ID de la URL (ej: /producto/1)
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        // 2. Nos posicionamos en el tope de la página al cargar el componente
        window.scrollTo(0, 0);

        // 3. Llamamos a nuestra función para buscar el producto por ID
        const cargarProducto = async () => {
            try {
                setLoading(true);
                const data = await traerProductoPorId(id);
                setProducto(data);
                setError(false);
            } catch (err) {
                console.error("Error al cargar el detalle:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            cargarProducto();
        }
    }, [id]); // Se vuelve a ejecutar si cambia el id en la URL

    const handlerVolver = () => {
        navigate(-1);
    };

    // Si está cargando, mostramos algo sutil o un loader
    if (loading) {
        return <div className="detalle-container"><p>Cargando detalle del producto...</p></div>;
    }

    // Si hubo un error (acá podrías usar tu componente de error con el enchufe lindo que armamos antes)
    if (error || !producto) {
        return (
            <div className="detalle-container">
                <p>No se pudo cargar el producto o no existe.</p>
                <button onClick={handlerVolver} className="button-ok">Volver</button>
            </div>
        );
    }

    return (
        <div className="item detalle-container">
            <img
               src={producto.image || svgPlaceholder}
               alt={producto.description}
               className="item-image"
               onError={(e) => { e.target.src = svgPlaceholder; }}
            />
           <h4 className="item-description">{producto.description}</h4>
           <p className="item-price">${producto.price ? Number(producto.price).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</p>
            
            {/* Propiedades exclusivas del producto */}
            <div className="producto-propiedades" style={{ margin: '12px 0', fontSize: '0.9rem', color: '#555', textAlign: 'left', padding: '0 10px' }}>
                <p><strong>Origen:</strong> {producto.origin || 'No especificado'}</p>
                <p><strong>Peso:</strong> {producto.weight ? `${producto.weight}` : 'No especificado'}</p>
            </div>

            {/* Botón OK para volver */}
            <button onClick={handlerVolver} className="button-ok">
                OK
            </button>
        </div>
    );
};

export default DetalleProducto;