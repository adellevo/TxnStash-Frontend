import { useEffect, useState } from "react";
import StashPreview from "./StashPreview";
import { Stash } from "../types";
import { loadStashes } from "hooks/useUser";
import { BASE_TYPES } from "styles/baseStyles";
import { shortenAddress } from "formatting";
import { sendDeleteStash, sendDeleteTxn } from "hooks/useStash";
import { getUserData, getUserId } from "utils/SessionHelper";
const AccountStashes = () => {
  //
  const user = getUserData();
  
  const [stashes, setStashes] = useState<Stash[]>([]);
  const [selectedStash, setSelected] = useState<any>();
  const [message, setMessage] = useState("");

  const loadStash = async (stash: any) => {
    setSelected(stash);
  };

  useEffect(() => {
    const userId = getUserId();
    loadStashes(userId).then((stashes) => {
      console.log("loaded stashes ", stashes);
      setStashes(stashes.reverse());
      setSelected(stashes[0]);
    })
  }, []);

  const handleDeleteTxn = (txn: any) => {
    sendDeleteTxn(txn.stashId,txn.transactionId).then((res) => {
      setMessage("Successfully deleted transaction");
    });
  };

  const handleDeleteStash = (stash: any) => {
    sendDeleteStash(stash.stashId).then((res) => {
      console.log("deleted stash ", res);
      setMessage("Stash deleted");
    });
  };


  return (
    <div className="w-1/2 items-center p-2">
      <p className="text-center text-4xl">Your Stashes</p>
      <div className="flex flex-col">
        <p>{message}</p>
        {stashes.map((stash: Stash) => StashPreview(stash, loadStash))}
      </div>
      {selectedStash ? (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div>
            <p className={BASE_TYPES.BASE_T1}>Stash Details</p>
            <p className={BASE_TYPES.BASE_T2}>Txn count: {selectedStash.transactions.length}</p>
            <p className={BASE_TYPES.BASE_T2}>name: {selectedStash.name}</p>
        </div>
        <button className={BASE_TYPES.BASE_BUTTON} onClick={() => handleDeleteStash(selectedStash)}>Delete Stash</button>

        </div>
        {selectedStash.transactions.map((txn: any) => (
          <div className="flex flex-col bg-slate-400 bg-opacity-30 p-2 m-3">
          <div className="flex flex-row justify-between">

            <p className={BASE_TYPES.BASE_LABEL}>ID: {txn.transactionId}</p>
            <p className={BASE_TYPES.BASE_LABEL}>name: {txn.name||""}</p>
            </div>
            <p>{`${shortenAddress(txn.address)}::${txn.module}::${txn.function}`}</p>
            {/* <div className="flex flex-row justify-between">
            <p>Args</p>
            {txn.args.map((arg: any) => (
              <input className={BASE_TYPES.BASE_INPUT}>{arg.value}</input>
            ))}
            </div> */}
            <div className="flex flex-col">
            <p>Events</p>
            {txn.events?.map((event: any) => (
              <div className="flex flex-row gap gap-2 p-1 m-1">
              <p className={BASE_TYPES.BASE_T2}>{event.eventType.toString()}</p>
              <p className={BASE_TYPES.BASE_T2}>{event.amount}</p>
              </div>
            ))}
            </div>
            <div className="flex flex-row justify-between">
            <button 
            onClick = {() => handleDeleteTxn(txn)}
            className={BASE_TYPES.BASE_BUTTON}>Remove</button>
            <button className={BASE_TYPES.BASE_BUTTON}>update</button>
            <button className={BASE_TYPES.BASE_BUTTON}>Use</button>
            </div>


        </div>))}
      </div>)
        : null}
    </div>
  );
};

export default AccountStashes;
