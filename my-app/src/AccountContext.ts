import * as React from "react";
import { useContext } from "react";

export interface AccountContext {
    //   connected: boolean;
    isAuthenticated: boolean;
    account: any | undefined;
}
const context = React.createContext<AccountContext | null>(null);
export const AccountContextProvider = context.Provider;
export const AccountContextConsumer = context.Consumer;

export const useAccountContext = () => {

    if (!context) {
        throw new Error("useWalletContext must be used within a walletContext");
    }
    return { ...useContext(context) };
};
