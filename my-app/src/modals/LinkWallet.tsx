
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import ModalWrapper from "./ModalWrapper";
import copy from "copy-to-clipboard";
import { useRef, useState } from 'react';
import { BASE_TYPES } from 'styles/baseStyles';
import { getUserData } from 'utils/SessionHelper';
import { addWallet } from 'hooks/useUser';
import { shortenAddress } from 'formatting';



const LinkWallet = () => {
  const user = getUserData();
  const [tempName, setTempName] = useState("");
  const {
    connect,
    account,
    wallets,
    connecting,
    disconnect,
    connected,
    wallet: currentWallet,
  } = useWallet();
  
  const tryLinkWallet = () => {
    if(user && user.userId){
    addWallet(
      user.userId, {address:account?.address?.toString() || "0x1", 
      name:currentWallet?.adapter.name || "Default"})
    .then((res) => {
      console.log("just added wallet ", res);
    })
    }
  }


  const renderWalletConnectorGroup = () => {
    return wallets?.map((wallet) => {
      const option = wallet.adapter;
      return (
        <button
          onClick={() => {
            connect(option.name);
          }}
          className={BASE_TYPES.BASE_BUTTON}
          id={option.name.split(' ').join('_')}
          key={option.name}
          >
          {option.name.split(' ')[0]}
        </button>
      );
    });
  };


  return (
      <div className="flex flex-col justify-between"> 
      {renderWalletConnectorGroup()}
      {connected &&account?
      <div>
        <p className=''>{shortenAddress(account.address?.toString()||"0x1")}</p>
        <input 
          onChange={(e) => setTempName(e.target.value)}
        type="text" className={BASE_TYPES.BASE_INPUT} value={currentWallet?.adapter.name||"default"}></input>
        {/* <p className=''>{account.address?.toString()}</p> */}
        <button 
          onClick={()=>tryLinkWallet()}
        className={BASE_TYPES.BASE_BUTTON + " w-full"} >Link This Wallet </button>
        <button 
          onClick={()=>disconnect()}
        className={BASE_TYPES.BASE_BUTTON + " w-full"} >Disconnect Wallet </button>

        </div>
        :<p className='text-sm text-center'>first, connect a wallet to link to your profile</p>
    }
      </div>
      
  );
}
export default LinkWallet;
