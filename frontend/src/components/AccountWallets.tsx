//this component loads the users linked wallets
// this is used in the account page
// this component also handles the linking of new wallets
import { MOCK_INFO } from "data/mock_info";
import { shortenAddress } from "formatting";
import { loadWallets, nameWallet } from "hooks/useUser";
import LinkWallet from "modals/LinkWallet";
import { useEffect, useState } from "react";
import { BASE_TYPES } from "styles/baseStyles";
import { getUserData } from "utils/SessionHelper";

const AccountWallets = () => {
  const user = getUserData();
  const [wallets, setWallets] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [toggleInput, setToggleInput] = useState(false);

  const toggle = () => {
    setToggleInput(!toggleInput);
  };

  useEffect(() => {
    const user_wallets = loadWallets(user.userId).then((res) => {;
    setWallets(res);
    });
  }, []);

  return (
    <div>
      <p className="text-3xl text-center font-bold"> Your Wallets</p>
      {wallets.map((wallet: any, index) => {
        return (
          <div key={index} className="bg-white bg-opacity-10 rounded-2xl p-3 my-3">
            <p>{wallet.name}</p>
            <button 
              onClick={toggle}
              className={BASE_TYPES.BASE_BUTTON}>Edit</button>
              {toggleInput && 
              <div>
              <input 
                onChange={(e) => setNewName(e.target.value)}
              type="text" className={BASE_TYPES.BASE_INPUT}></input>
              <button
                onClick={() => {nameWallet(wallet, newName); toggle();}}
                className={BASE_TYPES.BASE_BUTTON}>Save</button>
              </div>
              }
            <p>{shortenAddress(wallet.address)}</p>
          </div>
        );
      })}
      <div>
        <p className="text-center text-2xl">Add New Wallet</p>
        <LinkWallet />
      </div>
    </div>
  );
};

export default AccountWallets;
