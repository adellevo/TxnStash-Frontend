import { useEffect, useState } from "react";
import StashPreview from "./StashPreview";
import { Stash } from "../types";
import { loadStashes } from "hooks/useUser";
import { BASE_TYPES } from "styles/baseStyles";
import { shortenAddress } from "formatting";
import { sendDeleteStash, sendDeleteTxn } from "hooks/useStash";
const AccountStashes = () => {
  //
  const [stashes, setStashes] = useState<Stash[]>([]);
  const [selectedStash, setSelected] = useState<any>();
  const [message, setMessage] = useState("");

  const loadStash = async (stashId: number) => {
    const stashDetails = loadStash(stashId);
  };

  useEffect(() => {
    loadStashes(1).then((stashes) => {
      setStashes(stashes);
      setSelected(stashes[0]);
    })
  }, []);

  const handleDeleteTxn = (txn: any) => {
    sendDeleteTxn(txn.txnId).then((res) => {
      setMessage("Successfully deleted transaction");
    });
  };

  const handleStash = (txn: any) => {
    sendDeleteStash(txn.txnId).then((res) => {
      console.log("deleted stash ", res);
      setMessage("Stash deleted");
    });
  };



  return (
    <div className="w-1/2 items-center p-2">
      <h1>Your Stashes</h1>
      <div className="flex flex-col">
        <p>{message}</p>
        {stashes.map((stash: Stash) => StashPreview(stash, loadStash))}
      </div>
      {selectedStash ? (
      <div className="flex flex-col">
        <p className={BASE_TYPES.BASE_T1}>Stash Details</p>
        {selectedStash.transactions.map((txn: any) => (
          <div className="flex flex-col">
          <div className="flex flex-row justify-between">

            <p className={BASE_TYPES.BASE_LABEL}>ID: {txn.id}</p>
            <p className={BASE_TYPES.BASE_LABEL}>ID: {txn.name||""}</p>
            </div>
            <p>{`${shortenAddress(txn.address)}::${txn.module}::${txn.function}`}</p>
            <div className="flex flex-row justify-between">
            <p>Args</p>
            {txn.args.map((arg: any) => (
              <input className={BASE_TYPES.BASE_INPUT}>{arg.value}</input>
            ))}
            </div>
            <div className="flex flex-col">
            <p>Events</p>
            {txn.events.map((event: any) => (
              <input className={BASE_TYPES.BASE_INPUT}>{event.event_type}</input>
            ))}
            </div>
            <div className="flex flex-row justify-between">
            <button 
            onClick = {() => handleDeleteTxn(txn.id)}
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
