import {useState} from "react";
import './nav.css';
// Un SVG optimizado con un viewBox chico para que no se desborde
const svgPlaceholder = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100%' height='100%'><rect width='100' height='100' fill='%23f1f1f1'/><path d='M30 35h40v30H30z' fill='none' stroke='%23aaa' stroke-width='4'/><circle cx='45' cy='45' r='6' fill='%23aaa'/><path d='M30 60l15-15 10 10 10-10 15 15' fill='none' stroke='%23aaa' stroke-width='4'/></svg>";
const Item = ({description, price, image,favoritoInicial}) => {
    const [imgsrc, setImgsrc] = useState(image || svgPlaceholder);
    const [esFavorito, setEsFavorito] = useState(favoritoInicial);
        const handleFavoritoClick = () => {
        setEsFavorito(!esFavorito);
    };
        return(
        <div className="item">
            <img src={imgsrc} alt={description} className='item-image' 
                onError={() => setImgsrc(svgPlaceholder)}
            />
            <h4 className="item-description">{description}</h4>
            <p className="item-price">${price ? Number(price).toFixed(2) : '0.00'}</p>
            <button onClick={handleFavoritoClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                {esFavorito ? '❤️' : '🤍'}
            </button>
        </div>
    );
}; 

export default Item;

