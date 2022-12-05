import { MOCK_INFO } from "data/mock_info";
import { loadStashes } from "hooks/useUser";
import { getUserId } from "utils/SessionHelper";


const StashPage = () => {
    const userId = getUserId();
    return (
        <div className="w-full items-start h-full justify-center">
            <div className="flex flex-row justify-between items-center">
                {UserStashes(userId)}
            </div>
        </div>);
};

const UserStashes = (userId:number) => {
    const stashes = loadStashes(userId)
    return(
        <div>
            <p>Your Stashes</p>
        </div>
    );

}

export default StashPage;