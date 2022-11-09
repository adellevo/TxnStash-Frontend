import './index.css';
import App from './App';
import Navbar from 'components/Navbar';
// import Nav from './components/navbar/Nav';
import {
  WalletProvider,
  // HyperPayWalletAdapter,
  // AptosWalletAdapter,
  // HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  FewchaWalletAdapter,
  PontemWalletAdapter,
} from '@manahippo/aptos-wallet-adapter';
import { ReactNode, useState, useMemo } from 'react';
import WalletModal from 'modals/walletModal';

type WrapperProps = {
  children: NonNullable<ReactNode>;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
}) => {
  const [walletModalOpen, setWalletModal] = useState(false);
  

  const wallets = useMemo(
    () => [
      new MartianWalletAdapter(),
      new FewchaWalletAdapter(),
      new PontemWalletAdapter(),
    ],
    []
  );

  return (
         <WalletProvider
      wallets={wallets}
      autoConnect={false}
      onError={(error) => {
        console.log('wallet errors: ', error);
      }}>
          <Navbar showConnectModal={setWalletModal} />
          {children}
          {walletModalOpen ? <WalletModal isOpen={walletModalOpen} setIsOpen={setWalletModal} /> : null}
          </WalletProvider>
  );
}

export default Wrapper;