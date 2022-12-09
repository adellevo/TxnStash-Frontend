import { Types } from "aptos";
import { formatTimestamp, parsePayloadFunction, shortenAddress } from "formatting";
import { loadTxs } from "hooks/useAptos";
import { sendCreateStash } from "hooks/useStash";
import { loadWallets } from "hooks/useUser";
import { useEffect, useState } from "react";
import { BASE_TYPES } from "styles/baseStyles";
import { getUser, getUserData } from "utils/SessionHelper";

const TEST_USER = "0xdfc873cf7dc8bc99148f0704574dee49b322e7558337315a53f5b9b2758d24ea";
const CreatePage = () => {
  const user = getUserData();
  const user_wallets = user.wallets||[];
  const [selectedWallet, setSelectedWallet] = useState(user_wallets[0]);
  const [stashName, setStashName] = useState("");
  const [walletTransactions, setWalletTransactions] = useState<any[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  const [foundEvents, setFoundEvents] = useState<any[]>([]);
  const [selectedTransactions, setSelectedTransactions] = useState<any[]>([]);
  const [eventMap, setEventMap] = useState<Map<String, any>>(new Map());
  const [error, setError] = useState("");
  useEffect(() => {
    loadTxs(selectedWallet?.address?.toString() || TEST_USER).then((res) => {
      setWalletTransactions(res);
      console.log("just loaded Transactions ", res);
    });
  }, []);

  const handleWalletChange = (e: any) => {
    
    setSelectedWallet(e.target.value);
    loadTxs(e.target.value.address?.toString() || TEST_USER).then((res) => {
      setWalletTransactions(res);
      console.log("just loaded Transactions ", res);
    });
  }

  const handleCreateStash = () => {
    if (selectedTransactions.length !== 0 && stashName !== "") {
    console.log("CREATING STASH WITH ", selectedTransactions, stashName);
      sendCreateStash(
        selectedTransactions,
        stashName,
        user.userId,
        selectedWallet.walletId?.toString() || TEST_USER
      ).then((res) => {
        console.log("created stash ", res)
        setError("Stash created");
        setSelectedTransactions([]);
        setSelectedEvents([]);
        setFoundEvents([]);
        setEventMap(new Map());
        setStashName("");
        });

    } else {
      setError("Please select at least one transaction and give your stash a name");
    }
  };

  const addTxn = (txn: any) => {
    const temp_txns = selectedTransactions;
    const {addr,mod,scr} = parsePayloadFunction(txn.payload.function);
    const temp_map = eventMap;
    let temp_events = txn.events.map((e: any) => {
      const { addr, mod, scr } = parsePayloadFunction(e.type);
      const key = `${addr}-${mod}-${scr}`;
      return { ...e, key: key, type: scr, module: mod, address: addr };
    });

    let temp_args = txn.payload.arguments.map((e: any) => {
      return { ...e, key: e.name };
    });

    temp_events.forEach((e: any) => {
      if (temp_map.has(e.type)) {
        let new_val = temp_map.get(e.type);
        new_val.count += 1;
        temp_map.set(e.type, new_val);
      } else {
        temp_map.set(e.type, { count: 1, ...e, key: e.scr });
      }
    });
    setEventMap(temp_map);
    setFoundEvents([...foundEvents, ...temp_events]);
    setSelectedTransactions([{...txn,
      address:addr,
      function:scr,
      module:mod,
      args : temp_args,
      events:temp_events}, ...temp_txns]);
  };

  // const insertEvent

  return (
    <div className={BASE_TYPES.PAGE_BASE}>
      {/* SELECT WALLET TO CREATE STASH FROM */}
      <p className="font-bold">Select A Wallet to Import Transactions From</p>
          <select className={BASE_TYPES.BASE_INPUT}
            onChange={(e)=>handleWalletChange(e)}
          >
            {user_wallets.map((wallet: any) => {
              return <option value={wallet.address}>{wallet.address}</option>;
            })}
          </select>
      <div className="flex flex-row justify-between p-3 justify-start">
        <div>
        
          {walletTransactions.map((txn: any) => {
            return (
              <button onClick={() => addTxn(txn)} className={BASE_TYPES.BASE_BUTTON}>
                <div>
                  {TxnPayload(txn.payload)}
                  <div className="flex flex-row justify-between">
                    <p>events: {txn.events.length}</p>
                    <p>changes: {txn.changes.length}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p>gas: {txn.gas_used}</p>
                    <p>{formatTimestamp(txn.timestamp)} Hr. ago</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <div>
          <p className="text-center">Txn Hashes</p>
          {selectedTransactions.map((sTxn: any) => {
            return (
              <div>
                <p>{shortenAddress(sTxn.hash)}</p>
              </div>
            );
          })}
          <button
            className={BASE_TYPES.BASE_BUTTON + " w-full"}
            onClick={() => setSelectedTransactions([])}
          >
            {" "}
            Clear{" "}
          </button>
          <div className="flex flex-col justify-center">
            {/* STASH PREVIEW */}
            <div className={BASE_TYPES.BASE_DIV}>
              <p className="text-xl font-bold text-center">Stash Preview</p>
              <p>Txn count: {selectedTransactions.length}</p>
              <p>
                Total events:{" "}
                {selectedTransactions.reduce(
                  (prev, current) => prev + current.events.length,
                  0
                )}
              </p>
              <p>
                Total changes:{" "}
                {selectedTransactions.reduce(
                  (prev, current) => prev + current.changes.length,
                  0
                )}
              </p>
              <p>
                Total gas:{" "}
                {selectedTransactions.reduce(
                  (prev, current) => prev + Number(current.gas_used),
                  0
                )}
              </p>
            </div>

            <div className="items-center">
              <p className="text-center text-xl font-bold">Events to Index</p>
              <div className="flex flex-row justify-center justify-between opacity-50">
                <p className="text-right">Name</p>
                <p>address | Count</p>
              </div>
              {Array.from(eventMap.values()).map((event: any) => {
                // {foundEvents.map((event:any)=>{
                return (
                  <label
                    className={"flex flex-row " + BASE_TYPES.BASE_BUTTON}
                    key={event.key}
                  >
                    <input type="checkbox" />
                    <div className="flex flex-row justify-between w-full">
                      <p>{event?.eventType}</p>
                      <div className="flex flex-row justify-between gap gap-4">
                        <p>@{shortenAddress(event?.address)}</p>
                        <p className="text-lg text-right">{event?.count}</p>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            <input
              type="text"
              className={BASE_TYPES.BASE_INPUT}
              placeholder="Name for Stash"
              onChange={(e) => setStashName(e.target.value)}
            ></input>

            <button
              onClick={() => handleCreateStash()}
              className={BASE_TYPES.BASE_BUTTON}
            >
              Create Stash
            </button>

            <p>Event Summary</p>
            {selectedTransactions.map((tx: any) => {
              const event_details = tx.events.filter(
                (e: any) => e.type === "0x1::coin::DepositEvent"
                  || e.type === "0x1::coin::WithdrawEvent"
                  || e.type === "0x3::token::WithdrawEvent"
                  || e.type === "0x3::token::DepositEvent").map((e: any) => {
                    const quantity = parseFloat(e.data.amount);
                    return (<div>
                      <p>{quantity}</p>
                    </div>)
                  })

              return (<div>
                {event_details.map((e: any) => { return e })}
              </div>)
            })}
            {/* {selectedTransactions ? (
              <div>
                <p>Selected Transactions</p>
                 */}

          </div>
        </div>
      </div>
    </div>
  );
};

const TxnPayload = (payload: any) => {
    const { addr, mod, scr } = parsePayloadFunction(payload.function);
    return (
        <div>
            {/* <p>Payload Info</p> */}
            <div className="flex flex-row justify-start gap gap-2 p-2">
                <p>{shortenAddress(addr)}</p>
                <p>{mod}</p>
                <p>{scr}</p>
            </div>
        </div>
    )
}

export default CreatePage;
