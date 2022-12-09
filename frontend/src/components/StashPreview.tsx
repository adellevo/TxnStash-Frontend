import { BASE_TYPES } from "styles/baseStyles";
import { Stash } from "../types";

const StashPreview = (stash: Stash, selectStash: (stash: any) => void) => {
  return (
    <div className={"flex flex-col w-full justify-between p-2 m-2 "+BASE_TYPES.BASE_OUTLINE}>
      <div className={BASE_TYPES.BASE_ROW_ITEM}>
      <p>{stash.name}</p>
      <p>ID:{stash.stashId}</p>

      <p>walletId:{stash.walletId}</p>
      {/* <p>userId:{stash.userId}</p> */}
      </div>
      <button 
        className={BASE_TYPES.BASE_BUTTON}
      onClick={() => selectStash(stash)}>view Stash</button>
    </div>
  );
};

export default StashPreview;
