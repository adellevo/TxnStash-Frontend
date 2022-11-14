import { Types } from "aptos";
import { parsePayloadFunction, shortenAddress } from "formatting";
import { loadTxs } from "hooks/useAptos";
import { loadWallets } from "hooks/useUser";
import { useEffect, useState } from "react";
import { BASE_TYPES } from "styles/baseStyles"

const TEST_USER = "0x9ee9892d8600ed0bf65173d801ab75204a16ac2c6f190454a3b98f6bcb99d915";
const CreatePage = () => {
    const user_wallets = loadWallets(0);
    const [selectedWallet, setSelectedWallet] = useState(user_wallets[0]);
    const [stashName,setStashName] = useState("")
    const [walletTransactions, setWalletTransactions] = useState<any[]>([])

    const [selectedTransactions, setSelectedTransactions] = useState<any[]>([])

    useEffect(() => {

        loadTxs(selectedWallet.address?.toString() || TEST_USER).then((res) => {

            setWalletTransactions(res)
            console.log("just loaded Transactions ", res);
        }
        );
    }
        , []);

    const addTxn = (txn: any) => {
        const temp_txns = selectedTransactions;
        setSelectedTransactions([txn, ...temp_txns]);

    }

    return (
        <div className={BASE_TYPES.PAGE_BASE}>
            {/* SELECT WALLET TO CREATE STASH FROM */}
            <div className="flex flex-row justify-between p-3 justify-start">
                <div>
                    <p>Select A Wallet to Import Transactions From</p>
                    {walletTransactions.map((txn: any) => {
                        return (
                            <button
                                onClick= {()=>addTxn(txn)}
                             className={BASE_TYPES.BASE_BUTTON}>
                                <div>
                                    {TxnPayload(txn.payload)}
                                    <p>gas: {txn.gas_used}</p>
                                    <p>time: {txn.timestamp}</p>
                                    <p>changes: {txn.events.length}</p>
                                </div>
                            </button>
                        )
                    })
                    }
                </div>
                <div>
                    <p className="text-center">Txn Hashes</p>
                    {selectedTransactions.map((sTxn:any)=>{
                        return(
                            <div>
                                <p>{shortenAddress(sTxn.hash)}</p>
                            </div>
                        )})
                    }
                    <div className="flex flex-col justify-center">
                    <input type="text"
                        className={BASE_TYPES.BASE_INPUT}
                        placeholder="Name for Stash"
                        onChange={(e)=>setStashName(e.target.value)}
                    >

                    </input>
                    <button
                        // onClick={}
                        className={BASE_TYPES.BASE_BUTTON}> Create Stash</button>
                    </div>
                </div>
            </div>

        </div>
    )
}


const TxnPayload = (payload: any) => {
    const { addr, mod, scr } = parsePayloadFunction(payload.function);
    return (
        <div>
            <p>Payload Info</p>
            <div className="flex flex-row justify-start gap gap-2 p-2">
                <p>{shortenAddress(addr)}</p>
                <p>{mod}</p>
                <p>{scr}</p>
            </div>
        </div>
    )
}

export default CreatePage;