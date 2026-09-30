import "./personas.css";
import personasData from "../data/personas.json";

const Personas = () => {
    return (
        <>
            <div className="footer-personas">
                {personasData.map((persona) => (
                    <div className="persona-card" key={persona.id}>
                        <img src={persona.imagen} alt={persona.nombre} />
                        <h4>{persona.nombre}</h4>
                        <p>{persona.puesto}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Personas;