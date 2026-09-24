import '../../globals.css';

const BanderaUSA = ({ telefono }) => (
  <div className="bandera-telefono-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="10%" height="10%">
      <clipPath id="circleViewUSA">
        <circle cx="50" cy="50" r="50" />
      </clipPath>

      <g clipPath="url(#circleViewUSA)">
        {/* Fondo de franjas rojas y blancas */}
        {/* 13 franjas, cada una ocupa 7.69% de alto (100 / 13) */}
        <rect width="100" height="7.69" fill="#BF0A3D" />
        <rect y="7.69" width="100" height="7.69" fill="#FFFFFF" />
        <rect y="15.38" width="100" height="7.69" fill="#BF0A3D" />
        <rect y="23.07" width="100" height="7.69" fill="#FFFFFF" />
        <rect y="30.76" width="100" height="7.69" fill="#BF0A3D" />
        <rect y="38.45" width="100" height="7.69" fill="#FFFFFF" />
        <rect y="46.14" width="100" height="7.69" fill="#BF0A3D" />
        <rect y="53.83" width="100" height="7.69" fill="#FFFFFF" />
        <rect y="61.52" width="100" height="7.69" fill="#BF0A3D" />
        <rect y="69.21" width="100" height="7.69" fill="#FFFFFF" />
        <rect y="76.90" width="100" height="7.69" fill="#BF0A3D" />
        <rect y="84.59" width="100" height="7.69" fill="#FFFFFF" />
        <rect y="92.28" width="100" height="7.69" fill="#BF0A3D" />

        {/* Cantón azul (donde van las estrellas) */}
        {/* Usualmente ocupa 7 franjas de alto y un poco más de la mitad del ancho */}
        <rect width="50" height="53.83" fill="#002868" />
        
        {/* Estrellas estilizadas (representadas por puntos blancos) */}
        {/* Usamos una grilla simple para que entren en el círculo */}
        <g fill="#FFFFFF" transform="translate(4, 3)">
          {/* Fila 1 (6 estrellas) */}
          <circle cx="4" cy="6" r="2" />
          <circle cx="12" cy="6" r="2" />
          <circle cx="20" cy="6" r="2" />
          <circle cx="28" cy="6" r="2" />
          <circle cx="36" cy="6" r="2" />
          <circle cx="44" cy="6" r="2" />
          
          {/* Fila 2 (5 estrellas) */}
          <circle cx="8" cy="15" r="2" />
          <circle cx="16" cy="15" r="2" />
          <circle cx="24" cy="15" r="2" />
          <circle cx="32" cy="15" r="2" />
          <circle cx="40" cy="15" r="2" />

          {/* Fila 3 (6 estrellas) */}
          <circle cx="4" cy="24" r="2" />
          <circle cx="12" cy="24" r="2" />
          <circle cx="20" cy="24" r="2" />
          <circle cx="28" cy="24" r="2" />
          <circle cx="36" cy="24" r="2" />
          <circle cx="44" cy="24" r="2" />
          
          {/* Fila 4 (5 estrellas) */}
          <circle cx="8" cy="33" r="2" />
          <circle cx="16" cy="33" r="2" />
          <circle cx="24" cy="33" r="2" />
          <circle cx="32" cy="33" r="2" />
          <circle cx="40" cy="33" r="2" />
          
          {/* Fila 5 (6 estrellas) */}
          <circle cx="4" cy="42" r="2" />
          <circle cx="12" cy="42" r="2" />
          <circle cx="20" cy="42" r="2" />
          <circle cx="28" cy="42" r="2" />
          <circle cx="36" cy="42" r="2" />
          <circle cx="44" cy="42" r="2" />
        </g>
      </g>
    </svg>
    <p className="telefono-texto">{telefono}</p>
  </div>
);

export default BanderaUSA;