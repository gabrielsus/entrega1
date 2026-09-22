import logo from '../assets/e-shop.jpg'; 
import './header.css'
const Header = () => {
    return (
        <div className="encabezado">
            <img src = {logo} alt="E-SHOP ARGENTINA" />
            <h1> E-SHOP ARGENTINA  </h1>
        </div>
    )
}
export default Header