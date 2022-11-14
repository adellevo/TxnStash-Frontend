import { useEffect, useState } from "react";
import StashPreview from "./StashPreview";
import { Stash } from "../types";
const AccountStashes = () => {
  //
  const [stashes, setStashes] = useState<Stash[]>([]);
  const [selectedStash, setSelected] = useState<Stash[]>([]);

  const loadStash = async (stashId: number) => {
    const stashDetails = loadStash(stashId);
  };

  useEffect(() => {}, []);

  return (
    <div className="w-1/2 items-center p-2">
      <h1>Account Stashes</h1>
      <div className="flex flex-col">
        {stashes.map((stash: Stash) => StashPreview(stash, loadStash))}
      </div>
    </div>
  );
};

export default AccountStashes;
