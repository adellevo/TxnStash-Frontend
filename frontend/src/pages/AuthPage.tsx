import LoginView from "../components/LoginView";
import SignUpView from "../components/SignUpView";
import { login, signup } from "hooks/useUser";
import { useState } from "react";

const AuthPage = () => {
    return (
        <div className="items-center justify-center">
            
            <SignUpView />
            
            <p className="text-center">-------Or Login -------</p>
            <LoginView />
        </div>
  );
};

export default AuthPage;
