import axios from "axios";
import { MOCK_INFO } from "data/mock_info";
import { getUser, saveUser, saveUserData } from "utils/SessionHelper";
const BACKEND_BASE_URL = "http://127.0.0.1:5000";

const getHeaders = () => {
  const headers = {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${JSON.parse(getUser()!)}`,
  };
  return headers;
}

export const loadStashes = async (userID: number) => {
  const res = await axios.post(
    `${BACKEND_BASE_URL}/user-stashes`,
    {
      userId: userID,
    },
    {headers: getHeaders()}
    );
    return res.data.stashes;
};

export const loadWallets = (userID: number) => {
  return MOCK_INFO.MOCK_WALLETS;
};

export const addWallet = async (userID: number,wallet:any) => {
  const headers = {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${JSON.parse(getUser()!)}`,
  };
  const res = await axios.post(
    `${BACKEND_BASE_URL}/add-wallet`,
    {
      address: wallet.address,
      name: wallet.name,
      privateKey: "priv"
    },
    {headers: headers}
    );
};

export const login = async (username: String, password: string) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": true,
  };

  const res = await axios.post(
    `${BACKEND_BASE_URL}/login`,
    {
      username: username,
      password: password,
    },
    { headers: headers}
  );
  saveUser(res.data.user.access_token);
  return res.data;
};

export const signup = async (username: String, password: string) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": true,
  };
  const res = await axios.post(`${BACKEND_BASE_URL}/signup`, {
    username: username,
    password: password,
  },{headers: headers});
  // console.log("REQUEST Result", res);
  saveUser(res.data.user.access_token);
  saveUserData(res.data.user);
  return res.data;
};
