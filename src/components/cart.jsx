import { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import './nav.css';
import './cart.css';
const Cart = () => {
    const [carrito,setCarrito] = useState([]);

     useEffect(() => {
         const productosGuardados = JSON.parse(localStorage.getItem('carrito') || [])
         setCarrito(productosGuardados);
    },[]);

    const vaciarCarrito = () => {
        localStorage.removeItem('carrito');
        setCarrito([]);
    }
const totalCompra = carrito.reduce((acumulador, prod) => acumulador + Number(prod.price || 0), 0);

    if (carrito.length === 0) {
        return (
            <div className="cart-empty-container">
                <h2>Tu carrito está vacío 🛒</h2>
                <p>¡Explorá nuestro catálogo y sumá productos!</p>
                <Link to="/productos" className="cart-empty-link">
                    Ver productos
                </Link>
            </div>
        );
    }
return (
        <div className="cart-main-container">
            {/* Columna izquierda: Listado de productos con map */}
            <div className="cart-products-section">
                <h2>Productos en tu carrito</h2>
                {carrito.map((prod, index) => (
                    <div key={index} className="cart-item-row">
                        <img src={prod.image} alt={prod.description} className="cart-item-image" />
                        <div className="cart-item-info">
                            <h4>{prod.description}</h4>
                        </div>
                        <div className="cart-item-price">
                            ${Number(prod.price).toLocaleString('es-Ar',{ minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                    </div>
                ))}
                <button onClick={vaciarCarrito} className="cart-clear-btn">
                    Vaciar Carrito
                </button>
            </div>

            {/* Columna derecha: Resumen de compra estilo Mercado Libre */}
            <div className="cart-summary-section">
                <h3>Resumen de compra</h3>
                <hr className="cart-summary-divider" />
                <div className="cart-summary-total">
                    <span>Total</span>
                    <span>${totalCompra.toLocaleString({ minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <button className="cart-checkout-btn">
                    Continuar compra
                </button>
            </div>
        </div>
    );
};

export default Cart;
