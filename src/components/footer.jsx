import "./footer.css";
import Personas from "./personas";

const Footer = ({ children }) => {
    return (
        <footer className="footer-container">
            <p className="footer-email">E-Shop Argentina - Av. Santa Fe 1590 (C1060ABO) CABA - e-shop@eshop.com</p>
          
            {/* Acá se inyectan los children que le pases desde el Layout */}

            {children}
            <Personas />
            <p className="footer-derechos">© 2026 E-Shop Argentina. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;