import "./footer.css";
import Personas from "./personas";
import gcba from "../assets/gcba.svg";
import escudo from "../assets/logo_argentina-azul.svg";

const Footer = ({ children }) => {
    return (
        <footer className="footer-container">
            <p className="footer-email">E-Shop Argentina - Av. Santa Fe 1590 (C1060ABO) CABA - e-shop@eshop.com</p>
          
            {/* Acá se inyectan los children que le pases desde el Layout */}

            {children}
            <Personas />
            <p className="footer-derechos">© 2026 E-Shop Argentina. Todos los derechos reservados.</p>
            <div className="footer-gcba">
                <a href="https://buenosaires.gob.ar/gcaba_historico/gobierno-y-vinculo-ciudadano/defensa-al-consumidor" target="_blank" rel="noopener noreferrer" title="Defensa del Consumidor GCBA">
                    <img src={gcba} alt="Gobierno de la Ciudad de Buenos Aires" className="footer-gcba-logo" />
                    <p className="footer-gcba-text">Defensa del Consumidor GCBA</p>
                </a>
                <a href="https://www.argentina.gob.ar/aaip/datospersonales" target="_blank" rel="noopener noreferrer" title="Dirección Nacional de Protección de Datos Personales">
                    <img src={escudo} alt="DNPDP" className="footer-argentina-logo" />
                    <p className="footer-arg-text">Dirección Nacional de Protección de Datos Personales</p>
                </a>
            </div>
        </footer>
    );
};

export default Footer;