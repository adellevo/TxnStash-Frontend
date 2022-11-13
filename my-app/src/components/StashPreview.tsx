import {Stash } from '../types';

const StashPreview = (stash:Stash) => {
    return (
        <div className="stash">
            <p>{stash.stashName}</p>
            <p>{stash.walletId}</p>
            <p>{stash.walletId}</p>
        </div>
    );
}

export default StashPreview;