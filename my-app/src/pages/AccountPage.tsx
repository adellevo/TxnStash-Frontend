import LoginView from "../components/LoginView";
import SignUpView from "../components/SignUpView";
import { login, signup } from "hooks/useUser";
import { useState } from "react";
import { useUserContext } from "UserContext";
import { Link } from "react-router-dom";
import { BASE_TYPES } from "styles/baseStyles";
import AccountWallets from "components/AccountWallets";
import AccountStashes from "components/AccountStashes";

const AccountPage = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [isLogin, setIsLogin] = useState(false);
  const { user } = useUserContext();

  return (
    <div className="items-center justify-center">
      {user ? (
        <h1>Logged in as {user.username}</h1>
      ) : (
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-center">Not logged in</p>
          <Link to="auth">
            <button className={BASE_TYPES.BASE_BUTTON}>Authenticate</button>
          </Link>
        </div>
      )}

      <div className="flex flex-row justify-between">
        <AccountStashes />
        <AccountWallets />
      </div>
    </div>
  );
};

export default AccountPage;
