import { useState } from "react";
import './formProdLocal.css';

const FormProdLocal = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        description: initialData?.description || "",
        image: initialData?.image || "",
        price: initialData?.price || "",
        shipping: initialData?.shipping || "",
        weight: initialData?.weight || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        /* >>> AQUÍ ESTÁ EL CAMBIO: Agregamos este div con la clase modal-backdrop <<< */
        <div className="modal-backdrop">
            <form onSubmit={handleSubmit} className="form-prod-local">
                <div className="form-group">
                    <label htmlFor="description">Descripción:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Imagen:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="shipping">Envío:</label>
                    <input
                        type="text"
                        id="shipping"
                        name="shipping"
                        value={formData.shipping}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Peso:</label>
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-botones">
                    <button type="submit" >Guardar</button>
                    <button type="button"  onClick={onCancel}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default FormProdLocal;