import { Link } from 'react-router-dom';
import './nav.css'; // Mantenemos tu CSS
import {House} from './svg/house.jsx'; // Importamos el componente House
import {Bag} from './svg/bag.jsx'
import {Trolley} from './svg/trolley.jsx';
const Nav = () => {
    return (
        <nav className="nav-container">
            <div className='menu-principal'>
                <Link to= "/">
                    <House width="50px" height="50px" />
                </Link>
                <Link to= "/productos">
                    <Bag width ="50px" height="50px" />
                </Link>
                <Trolley widht ="50px" height="50px" />
            </div>
        </nav>
    );
};

export default Nav;