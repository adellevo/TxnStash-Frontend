import { BASE_TYPES } from "styles/baseStyles";
import { Stash } from "../types";

const StashPreview = (stash: Stash, selectStash: (stash: any) => void) => {
  return (
    <div className={"flex flex-row w-full justify-between p-2 m-2 "+BASE_TYPES.BASE_OUTLINE}>
      <div>
      <p>Name:{stash.name}</p>
      <p>ID:{stash.stashId}</p>

      </div>
      <p>walletId:{stash.walletId}</p>
      <p>userId:{stash.userId}</p>
      <button 
        className={BASE_TYPES.BASE_BUTTON}
      onClick={() => selectStash(stash)}>view Stash</button>
    </div>
  );
};

export default StashPreview;
