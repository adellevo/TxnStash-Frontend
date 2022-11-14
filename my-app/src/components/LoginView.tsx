import { login } from "hooks/useUser";
import { useState } from "react";
import { useUserContext } from "UserContext";

const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();
  return (
    <div className="items-center w-full p-4 m-3 outline-white">
      <h3 className="title">Login</h3>
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
          //   onClick={() => login(username, password)}
          onClick={() => login()}
          className="button is-block is-info is-large  text-black is-fullwidth bg-white"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginView;
