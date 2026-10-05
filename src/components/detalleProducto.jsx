import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import traerProductoPorId from "../API/traerunproducto.js";
import { CartContext } from "./cart/CartContext"; // Ajustá la ruta según tu estructura
import { svgPlaceholder } from "./svg/svgPlaceHolder";
import './nav.css';
import '/globals.css';
import './detalles.css';

const DetalleProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fueAgregado, setFueAgregado] = useState(false);

    // 1. Consumimos el contexto global del carrito
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        window.scrollTo(0, 0);

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
    }, [id]);

    const handlerVolver = () => {
        navigate(-1);
    };

    // 2. Usamos el contexto en lugar de localStorage a mano
    const handleAgregarCarrito = () => {
        if (!producto) return;
        
        // Llamamos a la función del context pasándole el producto
        addToCart({ 
            id: producto.id, 
            description: producto.description, 
            price: producto.price, 
            image: producto.image 
        }, 1); // Cantidad 1 por defecto

        setFueAgregado(true);

        setTimeout(() => {
            setFueAgregado(false);
        }, 2000);
    };

    if (loading) {
        return <div className="detalle-container"><p>Cargando detalle del producto...</p></div>;
    }

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
            
            <div className="producto-propiedades" style={{ margin: '12px 0', fontSize: '0.9rem', color: '#555', textAlign: 'left', padding: '0 10px' }}>
                <p><strong>Origen:</strong> {producto.origin || 'No especificado'}</p>
                <p><strong>Peso:</strong> {producto.weight ? `${producto.weight}` : 'No especificado'}</p>
            </div>

            <div className="detalle-botones">
                <button onClick={handleAgregarCarrito} className="btn-agregar-detalle" title="Agregar al carrito">
                    {fueAgregado ? '✅ ¡Listo!' : '🛒 Agregar'}
                </button>
                
                <button onClick={handlerVolver} className="btn-volver-detalle">
                    Volver
                </button>
            </div>
        </div>
    );
};

export default DetalleProducto;