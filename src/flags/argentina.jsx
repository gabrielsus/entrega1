import  '../../globals.css';
const BanderaArgentina = ({ telefono }) => (
<div className="bandera-telefono-container">
    <svg xmlns="http://w3.org" viewBox="0 0 100 100" width="10%" height="10%">
    <clipPath id="circleView">
        <circle cx="50" cy="50" r="50" />
    </clipPath>

    <g clip-path="url(#circleView)">
        <rect width="100" height="33.3" fill="#74ACDF" />
        <rect y="33.3" width="100" height="33.4" fill="#FFFFFF" />
        <rect y="66.7" width="100" height="33.3" fill="#74ACDF" />
        <g transform="translate(50, 50)">

        <circle r="6.5" fill="#F6B426" stroke="#855900" stroke-width="0.6" />

        <path d="M0,-6.5 L0,-13 M0,6.5 L0,13 M-6.5,0 L-13,0 M6.5,0 L13,0 
                M-4.6,-4.6 L-9.2,-9.2 M4.6,4.6 L9.2,9.2 M-4.6,4.6 L-9.2,9.2 M4.6,-4.6 L9.2,-9.2" 
                stroke="#F6B426" stroke-width="1.2" stroke-linecap="round" />

        <circle cx="-2" cy="-1.5" r="0.7" fill="#855900" />
        <circle cx="2" cy="-1.5" r="0.7" fill="#855900" />
        <path d="M-2,1.5 Q0,3.5 2,1.5" fill="none" stroke="#855900" stroke-width="0.6" stroke-linecap="round" />
        </g>
    </g>
    </svg>
    <p className="telefono-texto">{telefono}</p>
</div>
);
export default BanderaArgentina;