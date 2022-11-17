// const 

import axios from "axios";
import { getUser } from "utils/SessionHelper";


// const getData = async () => {
//   const headers = {
//     "Access-Control-Allow-Credentials": true,
//     Authorization: `Bearer ${JSON.parse(getUser()!)}`,
//   };

//   const res = await axios({
//     method: "GET",
//     url: `${BACKEND_BASE_URL}/profile`,
//     headers: headers,
//   });
//   setUser(res.data);

//   console.log(user);
// };

// useEffect(() => {
//   getData();
// }, []);


// const headers = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//     "Access-Control-Allow-Credentials": true,
//   };

//   const res = await axios.post(
//     `${BACKEND_BASE_URL}/login`,
//     {
//       username: username,
//       password: password,
//     }
//     // { headers: headers }
//     // { withCredentials: true }
//   );
//   saveUser(res.data.user.access_token);
//   return res.data;

export const sendDeleteStash = async (stashID: string) => {
  const headers = {
    "Access-Control-Allow-Credentials": true,
    Authorization: `Bearer ${JSON.parse(getUser()!)}`,
  };
  const res = await axios.post(
    `${process.env.BACKEND_BASE_URL}/delete-stash`,
    {
      stashID: stashID,
    },
    { headers: headers }
  );
  return res.data;
};

export const sendCreateStash = async (transactions: any[], stashName: String, userId: number, walletId: number) => {
  const headers = {
    "Access-Control-Allow-Credentials": true,
    Authorization: `Bearer ${JSON.parse(getUser()!)}`,
  };
  const res = await axios.post(
    `${process.env.BACKEND_BASE_URL}/create-stash`,
    {
      transactions: transactions,
      name: stashName,
      userId: userId,
      walletId: walletId,
      headers: headers,
      // payload: {transactions
    });

}

export const sendEditTxn = async (txnId: number,arg_values:any[],name="") => {
  const headers = {
    "Access-Control-Allow-Credentials": true,
    Authorization: `Bearer ${JSON.parse(getUser()!)}`,
  };
  const res = await axios.post(
    `${process.env.BACKEND_BASE_URL}/edit-txn`,
    {
      txnId: txnId,
      arg_values: arg_values,
      name: name,
    },{headers: headers});
}

export const sendDeleteTxn = async (txnId: number) => {
  const headers = {
    "Access-Control-Allow-Credentials": true,
    Authorization: `Bearer ${JSON.parse(getUser()!)}`,
  };
  const res = await axios.post(
    `${process.env.BACKEND_BASE_URL}/delete-txn`,
    {
      txnId: txnId,
    },
    {headers: headers}
    );
}

// looks at user stashes to find stashes containing given key,val
export const sendFindUses = async (userId: number,find_key:string,find_val:string) => {
  const headers = {
    "Access-Control-Allow-Credentials": true,
    Authorization: `Bearer ${JSON.parse(getUser()!)}`,
  };
  const res = await axios.post(
    `${process.env.BACKEND_BASE_URL}/find-txn`,
    {
      userId: userId,
      find_key: find_key,//address,function,module,event
      find_val: find_val, 
      
    },
    {headers: headers}
    );
  if(res.data){
    return res.data;
  }
  else{
    return {error:"no Stashes found"};
  }
}