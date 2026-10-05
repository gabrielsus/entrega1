import { Link } from 'react-router-dom';
import { useContext } from 'react';
import './nav.css';
import {House} from './svg/house.jsx'; // Importamos el componente House
import {Bag} from './svg/bag.jsx'
import {Trolley} from './svg/trolley.jsx';
import {CartContext} from './cart/CartContext.jsx';
const Nav = () => {
    const { totalItems } = useContext(CartContext); // Accedemos al total de items desde el contexto del carrito
    return (
        <nav className="nav-container">
            <div className='menu-principal'>
                <Link to= "/">
                    <House width="50px" height="50px" />
                </Link>
                <Link to= "/productos">
                    <Bag width ="50px" height="50px" />
                </Link>
                <Link to = "/carrito" className="nav-cart-link">
                    <Trolley widht ="50px" height="50px" />
                    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                </Link>
            </div>
        </nav>
    );
};

export default Nav;