export type Stash = {
  userId: number;
  walletId: number;
  stashName: string;
  stashId: number;
};

export type Wallet = {
  userId: number;
  walletId: number;
  walletName: string;
  address: string;
};

export type User = {
  userId: number;
  username: string;
  password?: string;
};
