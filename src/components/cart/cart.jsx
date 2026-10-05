import { useContext,useState } from "react";
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext'; // Ajustá la ruta según donde tengas tu context
import '../nav.css';
import './cart.css';

const Cart = () => {
    // Desestructuramos todo lo que necesitamos directamente del servicio global
    const { carrito, vaciarCarrito, totalCompra, updateQuantity, deleteItem } = useContext(CartContext);
    const [confirmandoVaciado, setConfirmandoVaciado] = useState(false);
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
                {carrito.map((prod) => (
                    <div key={prod.id} className="cart-item-row">
                        <img src={prod.image} alt={prod.description} className="cart-item-image" />
                        
                        <div className="cart-item-info">
                            <h4>{prod.description}</h4>
                            
                            {/* Controles de cantidad (+ / -) y cantidad actual */}
                            <div className="cart-item-controls">
                                <span className="cart-qty-label">Cantidad: <strong>{prod.cantidad || 1}</strong></span>
                                <div className="cart-qty-buttons">
                                        <button onClick={() => updateQuantity(prod.id, -1)} className="cart-btn-qty cart-btn-qty-rojo">-</button>
                                        <button onClick={() => updateQuantity(prod.id, 1)} className="cart-btn-qty cart-btn-qty-verde">+</button>
                                </div>
                            </div>
                        </div>

                        <div className="cart-item-price-section">
                            <div className="cart-item-price">
                                ${Number(prod.price * (prod.cantidad || 1)).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            {/* Botón de eliminar ítem completo */}
                            <button onClick={() => deleteItem(prod.id)} className="cart-delete-item-btn" title="Eliminar producto del carrito">
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
                
                <div className="cart-clear-container">
                    {!confirmandoVaciado ? (
                        <button onClick={() => setConfirmandoVaciado(true)} className="cart-clear-btn">
                            Vaciar Carrito
                        </button>
                    ) : (
                        <div className="cart-confirm-box">
                            <span>¿Vaciar todo el carrito?</span>
                            <button onClick={vaciarCarrito} className="cart-confirm-yes">Sí, vaciar</button>
                            <button onClick={() => setConfirmandoVaciado(false)} className="cart-confirm-no">Cancelar</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Columna derecha: Resumen de compra estilo Mercado Libre */}
            <div className="cart-summary-section">
                <h3>Resumen de compra</h3>
                <hr className="cart-summary-divider" />
                <div className="cart-summary-total">
                    <span>Total</span>
                    <span>${totalCompra.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <button className="cart-checkout-btn">
                    Continuar compra
                </button>
            </div>
        </div>
    );
};

export default Cart;