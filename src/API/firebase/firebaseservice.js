import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // la ruta a tu archivo de configuración

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos_internacionales")); // o el nombre de tu colección
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return products;
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    throw error;
  }
};