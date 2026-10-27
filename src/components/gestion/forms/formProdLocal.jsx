import { useState } from "react";
import './formProdLocal.css';
const FormProdLocal = ({ initialData,onSubmit, OnCancel }) => {
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
        <form onSubmit={handleSubmit} className="form-prod-local">
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="shipping">Shipping:</label>
                <input
                    type="text"
                    id="shipping"
                    name="shipping"
                    value={formData.shipping}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="weight">Weight:</label>
                <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                />
            </div>
            <div className="modal-botones">
                <button type="submit">Guardar</button>
                <button type="button" onClick={OnCancel}>Cancelar</button>
            </div>
        </form>
    );
};

export default FormProdLocal;