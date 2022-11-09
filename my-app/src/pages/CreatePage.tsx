import { loadWallets } from "hooks/useUser";
import { BASE_STYPES } from "styles/baseStyles"

const TEST_USER = "0x9ee9892d8600ed0bf65173d801ab75204a16ac2c6f190454a3b98f6bcb99d915";
const CreatePage = () => {
    const user_wallets = loadWallets(TEST_USER);
    return (
        <div className={BASE_STYPES.PAGE_BASE}>
            {/* SELECT WALLET TO CREATE STASH FROM */}
        </div>
    )
}