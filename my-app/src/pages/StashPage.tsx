import { MOCK_INFO } from "data/mock_info";
import { loadStashes } from "hooks/useUser";


const StashPage = () => {
    const userId = MOCK_INFO.TEST_ACCOUNT_ID;
    return (
        <div className="w-full items-start h-full justify-center">
            <div className="flex flex-row justify-between items-center">
                {UserStashes(userId)}
            </div>
        </div>);
};

const UserStashes = (userId:string) => {
    const stashes = loadStashes(userId)
    return(
        <div>
            <p>Your Stashes</p>
        </div>
    );

}

export default StashPage;