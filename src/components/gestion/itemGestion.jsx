import {imagenError} from "../svg/imagenError";
const svgPlaceholder = imagenError;
import './nav.css';
import { useState, useEffect } from 'react';

const ItemGestion =({id,description,price,image,shipping,OnEdit, OnDelete})=>{
    const [imgsrc, setImgsrc] = useState(image ? `${image}?t=${Date.now()}` : svgPlaceholder);

    useEffect(() => {
        if (image) {
            setImgsrc(`${image}?t=${Date.now()}`);
        } else {
            setImgsrc(svgPlaceholder);
        }
    }, [image]);

return(
    <div className="item">
        <img src={imgsrc} alt={description} className="item-image" onError={() => setImgsrc(svgPlaceholder)} />
        <h4 className="item-description">{description}</h4>
        <p className="item-price">${price ? Number(price).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '0'}</p>
        {shipping ? (
            <span className="item-shipping">Envío: ${shipping}</span>
        ) : (
            <span className="item-shipping gratis">Envío gratis</span>
        )}
        {/* Botones de edición y eliminación */}
        <div className="item-actions">
            <button onClick={() => OnEdit(id)} className="btn-editar" title="Editar producto">
                ✏️
            </button>
            <button onClick={() => OnDelete(id)} className="btn-eliminar" title="Eliminar producto">
                🗑️
            </button>
        </div>
    </div>
);
};
export default ItemGestion;