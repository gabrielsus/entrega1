import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/API/firebase/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider.');
    }

    return context;
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
        <AuthContext.Provider value={{ user, role, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};