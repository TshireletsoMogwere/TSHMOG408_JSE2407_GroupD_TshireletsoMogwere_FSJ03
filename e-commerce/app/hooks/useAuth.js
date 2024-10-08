import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To store any error messages

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    setError(null); // Reset error state before signing up
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Return user object on successful signup
    } catch (error) {
      setError(error.message); // Store the error message
      throw error; // Throw the error for handling in the component
    }
  };

  const signin = async (email, password) => {
    setError(null); // Reset error state before signing in
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Return user object on successful signin
    } catch (error) {
      setError(error.message); // Store the error message
      throw error; // Throw the error for handling in the component
    }
  };

  const signout = async () => {
    setError(null); // Reset error state before signing out
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message); // Store the error message
      throw error; // Throw the error for handling in the component
    }
  };

  return { user, loading, error, signup, signin, signout };
};

export default useAuth;
