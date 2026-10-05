import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cart/CartContext"; // Ajustá la ruta según tu estructura
import './nav.css';
import '/globals.css';
import { imagenError } from "./svg/imagenError";

const svgPlaceholder = imagenError;

const Item = ({ id, description, price, image, favoritoInicial }) => {
    const [imgsrc, setImgsrc] = useState(image || svgPlaceholder);
    const [esFavorito, setEsFavorito] = useState(favoritoInicial);
    const [fueAgregado, setFueAgregado] = useState(false);

    // 1. Consumimos el contexto del carrito
    const { addToCart } = useContext(CartContext);

    const handleFavoritoClick = () => {
        setEsFavorito(!esFavorito);
        // Acá más adelante podrás llamar a tu futuro FavoritosContext o API de Django
    };

    const handleAgregarAlCarrito = () => {
        // 2. Ejecutamos la acción global del contexto pasándole el producto
        addToCart({ id, description, price, image }, 1); // Asumimos cantidad 1 por defecto desde la card

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