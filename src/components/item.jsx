import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cart/CartContext";
import './nav.css';
import '/globals.css';
import { imagenError } from "./svg/imagenError";

const svgPlaceholder = imagenError;

const Item = ({ id, description, price, image, category, favoritoInicial, esInternacional = false }) => {
    const [imgsrc, setImgsrc] = useState(image || svgPlaceholder);
    const [esFavorito, setEsFavorito] = useState(favoritoInicial);
    const [fueAgregado, setFueAgregado] = useState(false);

    const { addToCart } = useContext(CartContext);

    const handleFavoritoClick = () => {
        setEsFavorito(!esFavorito);
    };

    const handleAgregarAlCarrito = () => {
        addToCart({ id, description, price, image, category }, 1);

        setFueAgregado(true);
        setTimeout(() => {
            setFueAgregado(false);
        }, 2000);
    };

    return (
        <div className="item">
            {category && <span className="item-category-badge">{category}</span>}

            <img 
                src={imgsrc} 
                alt={description} 
                className='item-image' 
                onError={() => setImgsrc(svgPlaceholder)}
            />
            
            <h4 className="item-description">{description}</h4>
            
            <p className="item-price">
                ${price ? Number(price).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '0'}
            </p>
            
            <button onClick={handleFavoritoClick} className="btn-favorito">
                {esFavorito ? '❤️' : '🤍'}
            </button>
            
            {/* Si es internacional, va a la ruta de firebase; sino, a la de Django */}
            <Link 
                to={esInternacional ? `/producto-internacional/${id}` : `/producto/${id}`} 
                className="btn-detalle" 
                title="Ver detalles del producto"
            >
                <span className="flecha-detalle">👁</span>
            </Link>
            
            <button onClick={handleAgregarAlCarrito} className="button-carrito" title="Agregar al carrito">
                {fueAgregado ? '✅ ¡Listo!' : '🛒'}
            </button>
        </div>
    );
}; 

export default Item;