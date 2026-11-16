import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { db, storage, secondaryAuth } from "./firebase";

export const ROLES = {
  ADMIN: "administrador",
  CLIENTE: "cliente"
};

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos_internacionales"));
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
    const storageRef = ref(storage, `${customPath}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir el archivo a Storage: ", error);
    throw error;
  }
};

// --- GESTIÓN DE PERFILES (COLECCIÓN 'profiles') ---

export const getProfileByUid = async (uid) => {
  try {
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error("Error al obtener el perfil por UID: ", error);
    throw error;
  }
};

export const getProfiles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "profiles"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error al listar los perfiles: ", error);
    throw error;
  }
};

export const createUserProfile = async (email, password, nombre, rol = ROLES.CLIENTE) => {
  try {
    const credencial = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const uid = credencial.user.uid;

    await setDoc(doc(db, "profiles", uid), {
      email,
      nombre,
      rol
    });

    await signOut(secondaryAuth);
    return uid;
  } catch (error) {
    console.error("Error al crear usuario y perfil: ", error);
    throw error;
  }
};

export const updateProfile = async (uid, profileData) => {
  try {
    const docRef = doc(db, "profiles", uid);
    await updateDoc(docRef, profileData);
  } catch (error) {
    console.error("Error al actualizar el perfil: ", error);
    throw error;
  }
};

export const deleteProfile = async (uid) => {
  try {
    await deleteDoc(doc(db, "profiles", uid));
  } catch (error) {
    console.error("Error al eliminar el perfil: ", error);
    throw error;
  }
};