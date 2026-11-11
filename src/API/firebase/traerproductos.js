import { db } from '../firebase/firebase.js'; // Ajustá la ruta según donde tengas tu firebase.js
import { collection, getDocs } from 'firebase/firestore';

const traerProductos = async () => {
    try {
        console.log("🟡 Intentando traer productos de Firestore...");

        const productosRef = collection(db, 'productos_internacionales');
        const querySnapshot = await getDocs(productosRef);

        // Mapeamos los documentos para extraer los datos y sumarle el id de Firestore
        const productos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(`🟢 Se trajeron ${productos.length} productos con éxito.`);
        return productos;

    } catch (error) {
        console.error("🔴 Error al traer productos de Firestore:", error);
        throw error;
    } finally {
        console.log("Finalizó el intento de traer los productos.");
    }
};

export default traerProductos;