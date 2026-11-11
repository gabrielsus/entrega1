import { db } from './firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

const updateProducto = async (id, productoData) => {
    try {
        const productoRef = doc(db, 'productos_internacionales', id);
        await updateDoc(productoRef, productoData);
        console.log('Producto actualizado con ID:', id);
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

export default updateProducto;