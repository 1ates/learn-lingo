import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { ref, get, set } from 'firebase/database';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  currentTheme: string;
  setTheme: (theme: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem('learn_lingo_theme') || 'yellow';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userRef = ref(db, `users/${currentUser.uid}`);
          const snap = await get(userRef);
          if (snap.exists()) {
            const val = snap.val();
            if (val.theme) {
              setCurrentTheme(val.theme);
              localStorage.setItem('learn_lingo_theme', val.theme);
            }
            if (val.favorites && Array.isArray(val.favorites)) {
              localStorage.setItem('learn_lingo_favorites', JSON.stringify(val.favorites));
            }
          }
        } catch (e) {
          console.log("Could not load user data from RTDB:", e);
        }
      } else {
        const savedTheme = localStorage.getItem('learn_lingo_theme') || 'yellow';
        setCurrentTheme(savedTheme);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const setTheme = async (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem('learn_lingo_theme', theme);
    if (user) {
      try {
        await set(ref(db, `users/${user.uid}/theme`), theme);
      } catch (e) {
        console.log("Could not save theme to RTDB:", e);
      }
    }
    window.dispatchEvent(new Event('themechange'));
  };

  const signIn = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email: string, pass: string, name: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    if (res.user) {
      await updateProfile(res.user, { displayName: name });
      setUser({ ...res.user, displayName: name });
      try {
        await set(ref(db, `users/${res.user.uid}`), {
          name,
          email,
          theme: currentTheme,
          favorites: []
        });
      } catch (e) {
        console.log("Could not initialize user in RTDB:", e);
      }
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setCurrentTheme('yellow');
    localStorage.setItem('learn_lingo_theme', 'yellow');
    window.dispatchEvent(new Event('themechange'));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, currentTheme, setTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
