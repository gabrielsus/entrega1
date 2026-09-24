import "./footer.css";

const Footer = ({ children }) => {
    return (
        <footer className="footer-container">
            <p className="footer-email">e-shop@eshop.com</p>
          
            {/* Acá se inyectan los children que le pases desde el Layout */}

            {children}
            <p className="footer-derechos">© 2026 E-Shop Argentina. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;