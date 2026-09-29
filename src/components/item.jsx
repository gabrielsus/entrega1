import {useState} from "react";
import {Link} from "react-router-dom"
import './nav.css';
import '/globals.css';
import { imagenError } from "./svg/imagenError";
// Un SVG optimizado con un viewBox chico para que no se desborde
const svgPlaceholder = imagenError;
const Item = ({id,description, price, image,favoritoInicial}) => {
    const [imgsrc, setImgsrc] = useState(image || svgPlaceholder);
    const [esFavorito, setEsFavorito] = useState(favoritoInicial);
    const handleFavoritoClick = () => {
        setEsFavorito(!esFavorito);
    };
    const [fueAgregado, setFueAgregado] = useState(false);
    const handleAgregarCarrito = () =>
            {
                const productoAeliminaroAgregar = {id,description,price,image};
                const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
                const nuevoCarrito = [...carritoActual,productoAeliminaroAgregar]
                localStorage.setItem('carrito',JSON.stringify(nuevoCarrito));
                setFueAgregado(true);

                setTimeout(() => {
                    setFueAgregado(false);
                }, 2000);
            }    

        return(
        <div className="item">
            <img src={imgsrc} alt={description} className='item-image' 
                onError={() => setImgsrc(svgPlaceholder)}
            />
            <h4 className="item-description">{description}</h4>
            <p className="item-price">${price ? Number(price).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '0'}</p>
            <button onClick={handleFavoritoClick} className="btn-favorito">
                {esFavorito ? '❤️' : '🤍'}
            </button>
            <Link to={`/producto/${id}`} className="btn-detalle" title="Ver detalles del producto">
                <span className="flecha-detalle">👁</span>
            </Link>
            <button onClick={handleAgregarCarrito} className="button-carrito" title="Agregar al carrito">
                    {fueAgregado ? '✅ ¡Listo!' : '🛒'}
        </button>
        </div>
    );
}; 

export default Item;

