import { Link } from 'react-router-dom';
import { useContext } from 'react';
import './nav.css';
import {House} from './svg/house.jsx'; // Importamos el componente House
import {Bag} from './svg/bag.jsx'
import {Trolley} from './svg/trolley.jsx';
import {CartContext} from './cart/CartContext.jsx';
import {CartWidget} from './svg/cartwidget.jsx';
import {AdminIcon} from './svg/candado.jsx'; // Importamos el componente AdminIcon
const Nav = () => {
    const { totalItems } = useContext(CartContext); // Accedemos al total de items desde el contexto del carrito
    return (
        <nav className="nav-container">
            <div className='menu-principal'>
                <Link to= "/" title="Inicio">
                    <House width="50px" height="50px" />
                </Link>
                <Link to= "/productos"  title="Productos Nacionales">
                    <Bag width ="50px" height="50px" />
                </Link>
                <Link to= "/productosinternacionales" title="Productos Internacionales">
                    <CartWidget width="50px" height="50px" />
                </Link>
                <Link to = "/carrito" className="nav-cart-link" title="Ver resumen de compra">
                    <Trolley widht ="50px" height="50px" />
                    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </Link>
                <Link to = "/gestion" title="Panel de Administración">
                    <AdminIcon width="50px" height="50px" />
                </Link>
            </div>
        </nav>
    );
};

export default Nav;