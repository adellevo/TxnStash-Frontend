const TEST_ACCOUNT_ADDRESS =
  "0x9ee9892d8600ed0bf65173d801ab75204a16ac2c6f190454a3b98f6bcb99d915";
const TEST_ACCOUNT_ID = "0";

const MOCK_WALLETS = [
  {
    address: TEST_ACCOUNT_ADDRESS,
    userId: TEST_ACCOUNT_ID,
    WalletId: TEST_ACCOUNT_ID,
    name: "Martian",
  },
];

const MOCK_ACCOUNT = {
  userId: 0,
  username: "mock-user",
  password: "pword",
};

export const MOCK_INFO = {
  TEST_ACCOUNT_ADDRESS,
  TEST_ACCOUNT_ID,
  MOCK_WALLETS,
  MOCK_ACCOUNT,
};
