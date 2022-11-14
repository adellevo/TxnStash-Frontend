import { Stash } from "../types";

const StashPreview = (stash: Stash, selectStash: (stashId: number) => void) => {
  return (
    <div className="stash">
      <p>{stash.stashName}</p>
      <p>{stash.walletId}</p>
      <p>{stash.userId}</p>
      <button onClick={() => selectStash(stash.stashId)}>view Stash</button>
    </div>
  );
};

export default StashPreview;
