import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const asyncAction = async (fn) => {
    try {
      setLoading(true);
      const result = await fn();
      return result;
    } finally {
      setLoading(false);
    }
  };

  const registerUser = (email, password) => {
    return asyncAction(() =>
      createUserWithEmailAndPassword(auth, email, password)
    );
  };

  const signInUser = (email, password) => {
    return asyncAction(
      async () => await signInWithEmailAndPassword(auth, email, password)
    );
  };

  const signInWithGoogle = () => {
    return asyncAction(async () => await signInWithPopup(auth, googleProvider));
  };

  const logOut = () => {
    return asyncAction(() => signOut(auth));
  };

  const upDateUserProfile = (profile) => {
    return asyncAction(async () => {
      await updateProfile(auth.currentUser, profile);
      await auth.currentUser.reload();
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    signInWithGoogle,
    logOut,
    setLoading,
    upDateUserProfile,
  };

  if (loading) {
    return (
      <span className="loading loading-spinner loading-xl flex justify-self-center mt-[500px]"></span>
    );
  }

  console.log(user);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
