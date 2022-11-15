import { AptosClient, Types } from "aptos";

const MAINNET_NODE_URL = "https://fullnode.mainnet.aptoslabs.com";
const defaultClient = new AptosClient(MAINNET_NODE_URL);
export const loadTxs = async (address: string, client: AptosClient = defaultClient): Promise<Types.Transaction[]> => {
  const txs = await client.getAccountTransactions(address,{limit:100})

  return txs.reverse();

}
