//this component loads the users linked wallets
// this is used in the account page
// this component also handles the linking of new wallets

import { useAccountContext } from "AccountContext";
import { MOCK_INFO } from "data/mock_info";
import { loadWallets } from "hooks/useUser";
import { useEffect, useState } from "react";

const AccountWallets =  () => {
    const [wallets, setWallets] = useState<any[]>([]);

    useEffect(() => {
        const user_wallets = loadWallets(0);
        setWallets(user_wallets);
    }, [])


    const {account} = useAccountContext();
    
    
    return (
        <div>
            <p className="text-3xl text-center font-bold"> Your Wallets</p>
            {wallets.map((wallet:any) => {
                return (
                    <div className="bg-white bg-opacity-10 rounded-2xl p-3">
                        <p>{wallet.name}</p>
                        <p>{wallet.address}</p>
                        </div>
                )
            })}
            <div>
            <p className="text-center text-2xl">Add New Wallet</p>
            <button className="w-full bg-white bg-opacity-10 rounded-2xl p-3">Connect Wallet</button>
            </div>
        </div>
    );
}

export default AccountWallets;
