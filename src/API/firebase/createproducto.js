import {db} from './firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const createProducto = async (productoData) => {
    try {
        const productosRef = collection(db, 'productos_internacionales');
        const docRef = await addDoc(productosRef, {
            ...productoData,
            category: productoData.category || 'general' // Default category if not provided
        });
        console.log('Producto creado con ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error al crear el producto:', error);
        throw error;
    }
};  

export default createProducto;
