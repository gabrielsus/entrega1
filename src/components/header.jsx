import logo from '../assets/e-shop.jpg'; 
import './header.css'
import Nav from './nav';
const Header = () => {
    return (
        <div>
            <div className="encabezado">
                <img src = {logo} alt="E-SHOP ARGENTINA" />
                <h1> E-SHOP ARGENTINA  </h1>           
            </div>
            <Nav />
        </div>
    )
}
export default Header