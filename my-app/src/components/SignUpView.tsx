import { signup } from "hooks/useUser";
import { useState } from "react";
import { BASE_TYPES } from "styles/baseStyles";

export default function SignUpView() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
             <div className="items-center w-full p-4 m-3 outline-white">
            <p className={BASE_TYPES.BASE_T1}>Signup</p>
            <div className="box">

                <div className="field">
                    <div className="control">
                        <input
                            className={BASE_TYPES.BASE_INPUT}
                            type="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                </div>

                <div className="fields">
                    <div className="control">
                        <input
                            className={BASE_TYPES.BASE_INPUT}
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="checkbox">
                        <input type="checkbox" name="remember" />
                        Remember me
                    </label>
                </div>
                <button
                    onClick={() => {
                        signup(username, password)
                        console.log(username, password)
                    }}
                    className={BASE_TYPES.BASE_BUTTON}>
                        Sign Up</button>
            </div>
        </div>
    )
}
