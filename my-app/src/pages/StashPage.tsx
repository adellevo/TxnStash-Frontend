import { loadStashes } from "hooks/useUser";


const StashPage = () => {
    const userId
    return (
        <div className="w-full items-start h-full justify-center">
            <div className="flex flex-row justify-between items-center">
                {UserStashes}
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