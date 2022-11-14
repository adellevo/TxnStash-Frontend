import LoginView from "../components/LoginView";
import SignUpView from "../components/SignUpView";
import { login, signup } from "hooks/useUser";
import { useState } from "react";
import { useAccountContext } from "AccountContext";
import { Link } from "react-router-dom";
import { BASE_TYPES } from "styles/baseStyles";
import AccountWallets from "components/AccountWallets";


const AccountPage = () => {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [isLogin, setIsLogin] = useState(false);
    const {account} = useAccountContext();


    return (
        <div className="items-center justify-center">
            {account? <h1>Logged in as {account}</h1> : 
                <div className="flex flex-col items-center justify-center p-2">
            
            <p className="text-center">Not logged in</p>
            <Link to="/auth">
                <button className={BASE_TYPES.BASE_BUTTON}>Authenticate</button>
            </Link>
            </div>}
            <AccountWallets/>
        </div>

    )
}

export default AccountPage;