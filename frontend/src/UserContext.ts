import { MOCK_INFO } from "data/mock_info";
import * as React from "react";
import { useContext } from "react";
import { User } from "./types";
export interface UserContext {
  //   connected: boolean;
  isAuthenticated: boolean;
  user: User | undefined;
}
const context = React.createContext<UserContext | null>({
  isAuthenticated: false,
  user: MOCK_INFO.MOCK_ACCOUNT,
});
export const UserContextProvider = context.Provider;
export const UserContextConsumer = context.Consumer;

export const useUserContext = () => {
  const ctx = useContext(context);
  //   if (!ctx) {
  //     throw new Error("useWalletContext must be used within a walletContext");
  //   }

  const logout = () => {
    if (ctx) {
      ctx.user = undefined;
    }
  };

  const login = () => {
    if (ctx !== undefined && ctx) {
      console.log("DOIN SOMETHING");
      ctx.user = MOCK_INFO.MOCK_ACCOUNT;
    } else {
      console.log("DOIN NOTHING");
    }
  };

  return { ...ctx, logout, login };
};
