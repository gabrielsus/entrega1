import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cart/CartContext";
import './nav.css';
import '/globals.css';
import { imagenError } from "./svg/imagenError";

const svgPlaceholder = imagenError;

// 1. Agregamos 'shipping' en las props que recibe el componente
const Item = ({ id, description, price, image, shipping, favoritoInicial }) => {
    const [imgsrc, setImgsrc] = useState(image || svgPlaceholder);
    const [esFavorito, setEsFavorito] = useState(favoritoInicial);
    const [fueAgregado, setFueAgregado] = useState(false);

    const { addToCart } = useContext(CartContext);

    const handleFavoritoClick = () => {
        setEsFavorito(!esFavorito);
    };

    const handleAgregarAlCarrito = () => {
        // 2. Incluimos el shipping dentro del objeto que viaja al carrito
        addToCart({ id, description, price, image, shipping }, 1);

        setFueAgregado(true);
        setTimeout(() => {
            setFueAgregado(false);
        }, 2000);
    };

    return (
        <div className="item">
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
            
            {/* 3. Renderizado opcional del envío en la tarjeta */}
            {shipping ? (
                <span className="item-shipping">Envío: ${shipping}</span>
            ) : (
                <span className="item-shipping gratis">Envío gratis</span>
            )}
            
            <button onClick={handleFavoritoClick} className="btn-favorito">
                {esFavorito ? '❤️' : '🤍'}
            </button>
            
            <Link to={`/producto/${id}`} className="btn-detalle" title="Ver detalles del producto">
                <span className="flecha-detalle">👁</span>
            </Link>
            
            <button onClick={handleAgregarAlCarrito} className="button-carrito" title="Agregar al carrito">
                {fueAgregado ? '✅ ¡Listo!' : '🛒'}
            </button>
        </div>
    );
}; 

export default Item;