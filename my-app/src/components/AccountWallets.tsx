//this component loads the users linked wallets
// this is used in the account page
// this component also handles the linking of new wallets
import { MOCK_INFO } from "data/mock_info";
import { loadWallets } from "hooks/useUser";
import LinkWallet from "modals/LinkWallet";
import { useEffect, useState } from "react";
import { BASE_TYPES } from "styles/baseStyles";

const AccountWallets = () => {
  const [wallets, setWallets] = useState<any[]>([]);

  useEffect(() => {
    const user_wallets = loadWallets(0);
    setWallets(user_wallets);
  }, []);

  return (
    <div>
      <p className="text-3xl text-center font-bold"> Your Wallets</p>
      {wallets.map((wallet: any, index) => {
        return (
          <div key={index} className="bg-white bg-opacity-10 rounded-2xl p-3">
            <p>{wallet.name}</p>
            <p>{wallet.address}</p>
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
