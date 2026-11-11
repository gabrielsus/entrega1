import {db} from './firebase.js';
import {doc, deleteDoc} from 'firebase/firestore';

const deleteProducto = async (id) => {
    try {
        const productoRef = doc(db, 'productos_internacionales', id);
        await deleteDoc(productoRef);
        console.log('Producto eliminado con ID:', id);
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

export default deleteProducto;