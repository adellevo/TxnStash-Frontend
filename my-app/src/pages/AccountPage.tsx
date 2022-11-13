import { login, signup } from "hooks/useUser";
import { useState } from "react";

const AccountPage = () => {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [isLogin, setIsLogin] = useState(false);

    // const LoginView = () => {
    //     const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    //     return (
    //         <div className="items-center w-full p-4 m-3 outline-white">
    //             <h3 className="title">Login</h3>
    //             <div className="box">

    //                     <div className="field">
    //                         <div className="control">
    //                             <input
    //                                 className="input is-large text-black"
    //                                 type="username"
    //                                 name="username"
    //                                 value={username}
    //                                 onChange={(e) => setUsername(e.target.value)}
    //                                 placeholder="Username"
    //                                 // autoFocus={true}
    //                             />
    //                         </div>
    //                     </div>
    //                     <div className="fields">
    //                         <div className="control">
    //                             <input
    //                                 className="input is-large text-black"
    //                                 type="password"
    //                                 name="password"
    //                                 value={password}
    //                                 onChange={(e) => setPassword(e.target.value)}
    //                                 placeholder="Password"
    //                             />
    //                         </div>
    //                     </div>
    //                     <div className="field">
    //                         <label className="checkbox">
    //                             <input type="checkbox" name="remember" />
    //                             Remember me
    //                         </label>
    //                     </div>
    //                     <button
    //                         onClick={() => login(username, password)}
    //                         className="button is-block is-info is-large is-fullwidth bg-white">Login</button>
    //             </div>
    //         </div>
    //     )
    // }

    const SignUp = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        return (
            <div className="items-center w-full p-4 m-3 outline-white">
                <h3 className="title">Signup</h3>
                <div className="box">
                    
                    <div className="field">
                        <div className="control">
                            <input
                                className="input is-large text-black"
                                type="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            // autoFocus={true}
                            />
                        </div>
                    </div>

                    <div className="fields">
                        <div className="control">
                            <input
                                className="input is-large text-black"
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
                        className="button is-block is-info is-large is-fullwidth bg-white text-black px-2 py-1 m-2 ">Sign Up</button>
                </div>
            </div>

        )
    }

    return (
        <SignUp />
        // <div>
        //     <button
        //         onClick={() => setIsLogin(!isLogin)}
        //     >{isLogin? "Login": "Signup"}</button>
        //     {isLogin ? <LoginView />:<SignUp />}

        // </div>
    )
}

export default AccountPage;