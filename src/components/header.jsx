import logo from '../assets/e-shop.jpg'; 
import bolsa from '../assets/bolsa.png';
import './header.css'
import Nav from './nav';

const Header = () => {
    return (
        <div>
            <div className="encabezado">
                <div className="encabezado-izquierda">
                    <img src={logo} alt="E-SHOP ARGENTINA" />
                    <h1>E-SHOP ARGENTINA</h1>           
                </div>
                {/* La bolsa chiquita a la derecha */}
                <img src={bolsa} alt="Bolsa" className="bolsa-chiquita" />
            </div>
            <Nav />
        </div>
    )
}

export default Header