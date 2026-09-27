import "./personas.css";
const Personas = () => {
    return (
        <>
<div className="footer-personas">
    <div className="persona-card">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Dev Team" />
        <h4>Lucas Gómez</h4>
        <p>Soporte Técnico</p>
    </div>
    <div className="persona-card">
        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Dev Team" />
        <h4>Sofía Martínez</h4>
        <p>Atención al Cliente</p>
    </div>
    <div className="persona-card">
        <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Dev Team" />
        <h4>Martín Fierro</h4>
        <p>Logística y Envíos</p>
    </div>
</div>
</>
    );
};

export default Personas;