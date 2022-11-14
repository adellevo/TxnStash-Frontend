import './index.css';
import Navbar from 'components/Navbar';
import {
  WalletProvider,
  MartianWalletAdapter,
  FewchaWalletAdapter,
  PontemWalletAdapter,
} from '@manahippo/aptos-wallet-adapter';
import { ReactNode, useState, useMemo } from 'react';
import WalletModal from 'modals/LinkWallet';
import { AccountContextProvider } from 'AccountContext';
import { BASE_TYPES } from 'styles/baseStyles';

type WrapperProps = {
  children: NonNullable<ReactNode>;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
}) => {
  const wallets = useMemo(
    () => [
      new MartianWalletAdapter(),
      new FewchaWalletAdapter(),
      new PontemWalletAdapter(),
    ],
    []
  );

  return (
      <div className={`h-screen flex flex-col items-center justify-start ${BASE_TYPES.BG_GRADIENT}`}>
    <WalletProvider
      wallets={wallets}
      autoConnect={false}
      onError={(error) => {
        console.log('wallet errors: ', error);
      }}>
      <AccountContextProvider value={null}>
        <Navbar  />
        {children}
      </AccountContextProvider>
    </WalletProvider>
    </div>
  );
}

export default Wrapper;