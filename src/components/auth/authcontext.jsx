import { onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from '@/API/firebase/firebase';
import { getProfileByUid, ROLES } from '@/API/firebase/firebaseservice';
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
        await user.getIdToken(true);
        const credencial = EmailAuthProvider.credential(user.email, passwordActual);
        await reauthenticateWithCredential(user, credencial);
        await updatePassword(user, nuevaPassword);
        return { success: true, message: "Contraseña actualizada con éxito" };
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
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
                // Apuntamos a la colección 'profiles' a través de firebaseservice
                const perfil = await getProfileByUid(currentUser.uid);
                if (request === latestRequest) {
                    setRole(perfil ? perfil.rol : ROLES.CLIENTE);
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

    const esAdmin = role === ROLES.ADMIN;

    return (
        <AuthContext.Provider value={{ user, role, esAdmin, login, logout, loading, cambiarPassword }}>
            {children}
        </AuthContext.Provider>
    );
};