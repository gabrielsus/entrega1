import logo from '../assets/e-shop.jpg'; 
import bolsa from '../assets/bolsa.png';
import './header.css';
import Nav from './nav';
import UserBar from './userbar'; // Importamos la userbar en minúscula

const Header = () => {
    return (
        <div>
            <div className="encabezado">
                <div className="encabezado-izquierda">
                    <img src={logo} alt="E-SHOP ARGENTINA" />
                    <h1>E-SHOP ARGENTINA</h1>           
                </div>
                <img src={bolsa} alt="Bolsa" className="bolsa-chiquita" />
            </div>
            <Nav />
            <UserBar /> {/* Ubicada de forma sutil justo debajo de la nav bar */}
        </div>
    );
};

export default Header;