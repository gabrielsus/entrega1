import "./footer.css";

const Footer = ({ children }) => {
  return (
    <footer className="footer">
      {children}
      <p>&copy; 2026 E-Shop Argentina. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;