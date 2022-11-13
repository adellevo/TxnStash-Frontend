import { loadWallets } from "hooks/useUser";
import { useState } from "react";
import { BASE_TYPES } from "styles/baseStyles"

const TEST_USER = "0x9ee9892d8600ed0bf65173d801ab75204a16ac2c6f190454a3b98f6bcb99d915";
const CreatePage = () => {
    const user_wallets = loadWallets(0);
    const [selectedWallet, setSelectedWallet] = useState(user_wallets[0]);
    return (
        <div className={BASE_TYPES.PAGE_BASE}>
            {/* SELECT WALLET TO CREATE STASH FROM */}
        </div>
    )
}