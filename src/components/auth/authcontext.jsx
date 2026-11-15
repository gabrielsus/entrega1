import { onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword,getIdToken,EmailAuthProvider,reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from '@/API/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider.');
    }

    return context;
};

const cambiarPassword = async (passwordActual, nuevaPassword) => {
    const user = auth.currentUser;
    if (!user || !user.email) {
        throw new Error("No hay un usuario autenticado.");
    }

    try {
        // 1. Forzamos la renovación del token actual con el servidor de Google
        await user.getIdToken(true);

        // 2. Creamos la credencial con la contraseña actual que tipeaste
        const credencial = EmailAuthProvider.credential(user.email, passwordActual);

        // 3. Reautenticamos con el token ya refrescado
        await reauthenticateWithCredential(user, credencial);

        // 4. Si todo OK, actualizamos la contraseña
        await updatePassword(user, nuevaPassword);
        
        return { success: true, message: "Contraseña actualizada con éxito" };
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        console.error("Código de error de Firebase:", error.code);
        console.error("Mensaje completo:", error.message);
        throw new Error(error.message || "Error al cambiar la contraseña");
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let latestRequest = 0;
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            const request = ++latestRequest;
            setLoading(true);
            setUser(currentUser);

            if (!currentUser) {
                setRole(null);
                setLoading(false);
                return;
            }

            try {
                const docSnap = await getDoc(doc(db, 'usuarios', currentUser.uid));
                if (request === latestRequest) {
                    setRole(docSnap.exists() ? docSnap.data().rol : 'cliente');
                }
            } catch (error) {
                if (request === latestRequest) {
                    console.error("Error al obtener el rol:", error);
                    setRole(null);
                }
            } finally {
                if (request === latestRequest) {
                    setLoading(false);
                }
            }
        });

        return () => {
            latestRequest++;
            unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout, loading,cambiarPassword }}>
            {children}
        </AuthContext.Provider>
    );
};