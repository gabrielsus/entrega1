import Header from './header';
import Nav from './nav';
import Footer from './footer';
import './layout.css';
import BanderaArgentina from '../flags/argentina';
import BanderaBrasil from '../flags/brasil';
import BanderaUruguay from '../flags/uruguay';
import BanderaUSA from "../flags/usa";
import Visa from "../payments/visa";
import Mastercard from '../payments/mastercard';
import MercadoPago from '../payments/mercadopago';
import Cabal from '../payments/cabal';
import Naranja from '../payments/naranja';
const Layout = () => {
    return (
        <div className="app-Layout">
            <Header />
            <Nav />
            <Footer className= "footer-container">
            <div className="footer-telefonos">
                <BanderaArgentina telefono="+54 9 11 6932-4650"/>
                <BanderaBrasil telefono="+55 81 9852-9996" /> 
                <BanderaUruguay telefono="+598 94 914 367" />
                <BanderaUSA telefono="+1 555-123-4567" />
            </div>
            <div className="footer-pagos">
                <Visa />
                <Mastercard />
                <Cabal />
                <Naranja />
                <MercadoPago />
            </div>
            </Footer>
        </div>
    );
}

export default Layout;