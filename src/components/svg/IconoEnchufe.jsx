const IconoEnchufe = ({ size = 64, color = 'currentColor' }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-enchufe" // Clase para darle estilos globales si querés
        >
            {/* Cuerpo del enchufe (basado en la forma redondeada de la foto) */}
            <path
                d="M12 16C12 12.6863 14.6863 10 18 10H46C49.3137 10 52 12.6863 16 16V48C52 51.3137 49.3137 54 46 54H18C14.6863 54 12 51.3137 12 48V16Z"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Pines (los tres contactos, inclinados como en la foto) */}
            {/* Pin central superior (Tierra) */}
            <path
                d="M32 10V22"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />
            {/* Pin izquierdo (Fase) */}
            <path
                d="M24 30V42"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />
            {/* Pin derecho (Neutro) */}
            <path
                d="M40 30V42"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />
            {/* Cable (simpleza de línea indicando que está desconectado) */}
            <path
                d="M8 16H12"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default IconoEnchufe;