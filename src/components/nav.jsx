import { Link } from 'react-router-dom';
import './nav.css'; // Mantenemos tu CSS

const Nav = () => {
    return (
        <nav className="nav-container">
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;