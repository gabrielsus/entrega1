import '../../globals.css';

const BanderaUruguay = ({ telefono }) => (
  <div className="bandera-telefono-container">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="10%" height="10%">
      <clipPath id="circleViewUruguay">
        <circle cx="50" cy="50" r="50" />
      </clipPath>

      <g clipPath="url(#circleViewUruguay)">
        {/* Fondo de franjas blancas y celestes */}
        <rect width="100" height="100" fill="#FFFFFF" />
        <rect width="100" height="14.3" fill="#007ABD" />
        <rect y="28.6" width="100" height="14.3" fill="#007ABD" />
        <rect y="57.1" width="100" height="14.3" fill="#007ABD" />
        <rect y="85.7" width="100" height="14.3" fill="#007ABD" />

        {/* Cuadrante superior izquierdo (Canton) */}
        <rect width="44" height="43" fill="#FFFFFF" />
        
        {/* Sol de Mayo estilizado */}
        <g transform="translate(22, 21.5)">
          <circle r="6" fill="#FBCB0A" />
          <g stroke="#FBCB0A" strokeWidth="1.5" strokeLinecap="round">
            <line x1="0" y1="-9.5" x2="0" y2="-13" />
            <line x1="0" y1="9.5" x2="0" y2="13" />
            <line x1="-9.5" y1="0" x2="-13" y2="0" />
            <line x1="9.5" y1="0" x2="13" y2="0" />
            <line x1="-6.7" y1="-6.7" x2="-9.2" y2="-9.2" />
            <line x1="6.7" y1="6.7" x2="9.2" y2="9.2" />
            <line x1="-6.7" y1="6.7" x2="-9.2" y2="9.2" />
            <line x1="6.7" y1="-6.7" x2="9.2" y2="-9.2" />
          </g>
        </g>
      </g>
    </svg>
    <p className="telefono-texto">{telefono}</p>
  </div>
);

export default BanderaUruguay;