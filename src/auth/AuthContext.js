import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from '../firebase/config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtener datos adicionales del usuario desde Firestore
  const fetchUserData = async (uid) => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const additionalData = await fetchUserData(userCredential.user.uid);
      
      return { 
        success: true, 
        user: {
          ...userCredential.user,
          role: additionalData?.role || 'user'
        } 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const register = async (email, password, isAdmin = false) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Guardar información adicional en Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        role: isAdmin ? 'admin' : 'user',
        createdAt: new Date().toISOString()
      });

      return { 
        success: true, 
        user: {
          ...userCredential.user,
          role: isAdmin ? 'admin' : 'user'
        } 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const additionalData = await fetchUserData(currentUser.uid);
        setUser({
          ...currentUser,
          role: additionalData?.role || 'user'
        });
        setUserData(additionalData);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userData,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);