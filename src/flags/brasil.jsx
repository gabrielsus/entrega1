import '../../globals.css';

const BanderaBrasil = ({ telefono }) => (
  <div className="bandera-telefono-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="10%" height="10%">
      <clipPath id="circleViewBrasil">
        <circle cx="50" cy="50" r="50" />
      </clipPath>

      <g clipPath="url(#circleViewBrasil)">
        {/* Fondo verde */}
        <rect width="100" height="100" fill="#009c3b" />
        
        {/* Rombo amarillo */}
        <polygon points="50,16 86,50 50,84 14,50" fill="#ffdf00" />
        
        {/* Círculo azul */}
        <circle cx="50" cy="50" r="22" fill="#002776" />
        
        {/* Banda blanca estilizada */}
        <path d="M 30,56 Q 50,42 70,48" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </svg>
    <p className="telefono-texto">{telefono}</p>
  </div>
);

export default BanderaBrasil;