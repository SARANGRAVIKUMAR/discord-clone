import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_logo">
        <img
          alt=""
          src="https://discord.com/assets/3437c10597c1526c3dbd98c737c2bcae.svg"
        />
      </div>
      <Button onClick={signIn}>Sing In</Button>
    </div>
  );
};

export default Login;
