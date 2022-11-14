
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import ModalWrapper from "./ModalWrapper";
import copy from "copy-to-clipboard";
import { useRef, useState } from 'react';
import { BASE_TYPES } from 'styles/baseStyles';



const LinkWallet = () => {
  
  const {
    connect,
    account,
    wallets,
    connecting,
    connected,
    wallet: currentWallet,
  } = useWallet();


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
        <p className=''>{account.address?.toString()}</p>
        <p className=''>{currentWallet?.adapter.name}</p>
        <p className=''>{account.address?.toString()}</p>
        <button 
          // onClick={}
        className={BASE_TYPES.BASE_BUTTON + " w-full"} >Link This Wallet </button>

        </div>
        :<p className='text-sm text-center'>first, connect a wallet to link to your profile</p>
    }
      </div>
      
  );
}
export default LinkWallet;