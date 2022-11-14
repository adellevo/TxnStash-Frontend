import LoginView from "../components/LoginView";
import SignUpView from "../components/SignUpView";
import { login, signup } from "hooks/useUser";
import { useState } from "react";
import { useUserContext } from "UserContext";
import { BASE_TYPES } from "styles/baseStyles";

const AuthPage = () => {
  const { user, login, logout } = useUserContext();

  const onLogout = () => {};

  console.log(user);

  return (
    <div className="items-center justify-center">
      {user ? (
        <div>
          <h1>Logged in as {user.username}</h1>
          <button className={BASE_TYPES.BASE_BUTTON} onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl">Not logged in</h1>
          <SignUpView />

          <p className="text-center">-------Or Login -------</p>
          <LoginView />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
