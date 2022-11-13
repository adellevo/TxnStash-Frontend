import LoginView from "../components/LoginView";
import SignUpView from "../components/SignUpView";
import { login, signup } from "hooks/useUser";
import { useState } from "react";
import { useAccountContext } from "AccountContext";


const AuthPage = () => {
    const {account} = useAccountContext();

    return (
        <div className="items-center justify-center">
            {account? <h1>Logged in as {account}</h1> : <h1>Not logged in</h1>}
            <SignUpView />
            
            <p className="text-center">-------Or Login -------</p>
            <LoginView />
        </div>

    )
}

export default AuthPage;