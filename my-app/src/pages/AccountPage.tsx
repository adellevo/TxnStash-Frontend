import LoginView from "../components/LoginView";
import SignUpView from "../components/SignUpView";
import { login, signup } from "hooks/useUser";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_TYPES } from "styles/baseStyles";
import AccountWallets from "components/AccountWallets";
import AccountStashes from "components/AccountStashes";
import { saveUser, clearUser, getUser, saveUserData } from "utils/SessionHelper";
import axios from "axios";
const BACKEND_BASE_URL = "http://localhost:5000";

const AccountPage = () => {
  const [user, setUser] = useState<any>("");
  

  const getData = async () => {
    const headers = {
      "Access-Control-Allow-Credentials": true,
      Authorization: `Bearer ${JSON.parse(getUser()!)}`,
    };

    const res = await axios({
      method: "GET",
      url: `${BACKEND_BASE_URL}/profile`,
      headers: headers,
    });
    setUser(res.data.user);
    saveUserData(res.data.user.access_token);

    console.log(user);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="items-center justify-center">
      {user ? (
        <h1>Logged in as {user}</h1>
      ) : (
        // <h1>Logged in as {user.username}</h1>
        <div className="flex flex-col items-center justify-center p-2">
          <p className="text-center">Not logged in</p>
          <Link to="/auth">
            <button className={BASE_TYPES.BASE_BUTTON}>Authenticate</button>
          </Link>
        </div>
      )}
      <div className="flex flex-row justify-between items-center">
        <AccountStashes />
        <AccountWallets />
      </div>
    </div>
  );
};

export default AccountPage;
