import { MOCK_INFO } from "data/mock_info";
import { shortenAddress } from "formatting";
import { get_transactions_by_event, get_stashes_by_user, popular_uses } from "hooks/useStats";
import { loadStashes } from "hooks/useUser";
import { useEffect, useState } from "react";
import { BASE_TYPES } from "styles/baseStyles";


const StatsPage = () => {
    const [selectedEvent, setSelectedEvent] = useState("DepositEvent");
    const [selectedStash, setSelectedStash] = useState(6);
    const [popular, setPopular] = useState<any[]>([]);
    const [stashes, setStashes] = useState([]);
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        (async() => {
            const stashes = await get_stashes_by_user(1);
            const events = await get_transactions_by_event(selectedStash, selectedEvent); 
            const popular_txs = await popular_uses();
            setStashes(stashes.data);
            setEvents(events.data);
            setPopular(popular_txs.data);

            console.log("stashes: ", stashes)
            console.log("events:", events)
            console.log("popular", popular_txs)
        })();
    }, []);

    return (
        <div className="w-full items-start h-full justify-center">
                <p>Query For events</p>
            <div className="flex flex-row justify-start items-center">
                
                <input type="text" className={BASE_TYPES.BASE_INPUT} value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}></input>
                <input type="text" className={BASE_TYPES.BASE_INPUT} value={selectedStash} onChange={(e) => setSelectedStash(parseInt(e.target.value))}></input>
                <button className={BASE_TYPES.BASE_BUTTON} onClick={() => {
                    (async() => {
                        const events = await get_transactions_by_event(selectedStash, selectedEvent);
                        setEvents(events.data);
                    })();
                }}>Query</button>
            </div>

            <div className="items-start">
                <p> Results </p>
                {events.length!==0 && 
                events.map((event, index) => {
                    return (
                        <div key={index}>
                            <p>{event}</p>
                        </div>
                    );
                })}

            </div>

            <div className="items-center">
                <p className={BASE_TYPES.BASE_T1}> Popular Functions </p>
                {popular.length!==0 && 
                popular.map((event, index) => {
                    return (
                        <div key={index} className={BASE_TYPES.BASE_ROW_ITEM}>
                            <p>{event.function} @</p>
                            <p>{shortenAddress(event.address)}</p>
                            <p>{event.count}</p>
                        </div>
                    );
                })}

            </div>
        </div>);
};



export default StatsPage;