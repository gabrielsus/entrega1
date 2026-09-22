import { Children } from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Children />
      <p>&copy; 2026 E-Shop Argentina. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;