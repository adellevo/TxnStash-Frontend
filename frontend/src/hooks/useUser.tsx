import axios from "axios";
import { MOCK_INFO } from "data/mock_info";
// import {BACKEND_BASE_URL} from "constants";

import { getUser, saveUser, saveUserData } from "utils/SessionHelper";

const BACKEND_BASE_URL = "http://127.0.0.1:5000";
export const getHeaders = () => {
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

export const loadWallets =  async (userID: number) => {
  const headers = getHeaders()
  if (userID === 0) {
    return MOCK_INFO.MOCK_WALLETS;
  }
  const res = await axios.get(
    `${BACKEND_BASE_URL}/get-wallets?userId=${userID}`,
    {headers: headers}
    );
    if(res.data.wallets.length < 0){
      return MOCK_INFO.MOCK_WALLETS
    }
    return res.data.wallets;
};

export const addWallet = async (userID: number,wallet:any) => {
  const headers = getHeaders()
  const res = await axios.post(
    `${BACKEND_BASE_URL}/addwallet`,
    {
      address: wallet.address,
      name: wallet.name,
      privateKey: "priv"
    },
    {headers: headers}
    );
    return res.data;
};

export const removeWallet = async (userID: number,wallet:any) => {
  const headers = getHeaders();
  const res = await axios.post(
    `${BACKEND_BASE_URL}/remove-wallet`,
    {
      address: wallet.address,
      name: wallet.name,
      privateKey: "priv"
    },
    {headers: headers}
    );
};

export const nameWallet = async (wallet:any,new_name:string) => {
  const headers = getHeaders();
  const res = await axios.post(
    `${BACKEND_BASE_URL}/name-wallet`,
    {
      walletId: wallet.walletId,
      name: wallet.name,
    },
    {headers: headers}
    );
};

export const login = async (username: String, password: string) => {
  const headers = getHeaders();

  const res = await axios.post(
    `${BACKEND_BASE_URL}/login`,
    {
      username: username,
      password: password,
    },
    { headers: headers}
  );
  
  saveUser(res.data.user.access_token);
  saveUserData(res.data.user);
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
  if(res.status === 200){
  saveUser(res.data.user.access_token);
  saveUserData(res.data.user);
  return res.data;
  } else {
    return res.data;
  }

};
