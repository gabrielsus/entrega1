export const AdminIcon = (props) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Degradado metálico cromado para el arco */}
        <linearGradient id="arcoMetalico" x1="20" y1="20" x2="80" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="30%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#9e9e9e" />
          <stop offset="75%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#757575" />
        </linearGradient>

        {/* Degradado dorado realista para el cuerpo */}
        <linearGradient id="cuerpoDorado" x1="10" y1="40" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="30%" stopColor="#F5AF19" />
          <stop offset="70%" stopColor="#E65C00" />
          <stop offset="100%" stopColor="#993300" />
        </linearGradient>

        {/* Degradado para la cerradura de la llave */}
        <linearGradient id="cerraduraMetal" x1="50" y1="58" x2="50" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2c2c2c" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>

        {/* Sombra suave interna/inferior */}
        <filter id="sombraIncrustada" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Arco Metalizado Cromado */}
      <path
        d="M 30 48 V 30 A 20 20 0 0 1 70 30 V 48"
        fill="none"
        stroke="url(#arcoMetalico)"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* Cuerpo Dorado del Candado */}
      <rect
        x="18"
        y="44"
        width="64"
        height="46"
        rx="8"
        fill="url(#cuerpoDorado)"
        stroke="#7A2800"
        strokeWidth="1.5"
        filter="url(#sombraIncrustada)"
      />

      {/* Brillo superior en el cuerpo dorado */}
      <path
        d="M 22 47 H 78"
        stroke="#FFF3B0"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Agujero de la Llave (Cerradura) */}
      <circle cx="50" cy="63" r="5" fill="url(#cerraduraMetal)" />
      <polygon points="47,64 53,64 51.5,76 48.5,76" fill="url(#cerraduraMetal)" />
    </svg>
  );
};