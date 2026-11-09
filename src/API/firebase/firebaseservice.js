import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // la ruta a tu archivo de configuración
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

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

export const uploadFileToFirebase = async (file, customPath) => {
  try {
    // Armamos la referencia en el storage (ej: 'productos/nombre-archivo.jpg')
    const storageRef = ref(storage, `${customPath}/${file.name}`);
    
    // Subimos el archivo binario
    const snapshot = await uploadBytes(storageRef, file);
    
    // Obtenemos la URL pública de descarga para guardarla después en Firestore
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error("Error al subir el archivo a Storage: ", error);
    throw error;
  }
};