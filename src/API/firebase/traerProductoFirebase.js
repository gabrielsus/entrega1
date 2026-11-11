import { db } from "./firebase.js"; // Ajustá la ruta a tu config de firebase
import { doc, getDoc } from "firebase/firestore";

const traerProductoFirebase = async (id) => {
    try {
        const docRef = doc(db, 'productos_internacionales', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw new Error(`El producto internacional con ID ${id} no existe en Firebase.`);
        }

        // Retornamos el id y los datos planos
        return {
            id: docSnap.id,
            ...docSnap.data()
        };
    } catch (error) {
        console.error(`Error al traer el producto de Firebase ${id}:`, error);
        throw error;
    }
};

export default traerProductoFirebase;