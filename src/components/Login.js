import React from "react";
import { auth, provider } from "../firebase.config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      localStorage.setItem("isAuth", !!user);
      setIsAuth(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
