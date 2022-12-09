import { MOCK_INFO } from "data/mock_info";
import { shortenAddress } from "formatting";
import { get_transactions_by_event, get_stashes_by_user, popular_uses, get_event_counts } from "hooks/useStats";
import { loadStashes } from "hooks/useUser";
import { useEffect, useState } from "react";
import { BASE_TYPES } from "styles/baseStyles";
import { getUserData } from "utils/SessionHelper";
import ApexCharts from 'apexcharts'
import React, { Component } from 'react';
import Chart from "react-apexcharts"

interface BarProps {
    options: any;
    series: any;
}

interface StackedBarProps {
    options: any;
    series: any;
}

const BarChartWrapper = ({options, series}:BarProps) => {
    return (
      <div>
         <Chart
              options={options}
              series={series}
              type="bar"
              width="500"
            />
      </div>
    );
}

// const StackedBarChartWrapper = ({options, series}:StackedBarProps) => {
const StackedBarChartWrapper = () => {
    const event_types = series.map((event:any) => event.eventType);
    const all_stash_ids = series.map((event:any) => event.stashId);
    // const unique_e
    // const by_event =

    const withdrawEvents = series.filter((event:any) => event.eventType = "WithdrawEvent");
    const depositEvents = series.filter((event:any) => event.eventType = "DepositEvent");
    const transferEvents = series.filter((event:any) => event.eventType = "TransferEvent");
    const burnEvents = series.filter((event:any) => event.eventType = "BurnEvent");

    const unique_stash_ids = [...all_stash_ids].sort();

    const seriesData = [
        {
            name: "WithdrawEvent",
            data: withdrawEvents.map((item:any) => item.count)
        },
        {
            name: "DepositEvent",
            data: depositEvents.map((item:any) => item.count)
        },
        {
            name: "TransferEvent",
            data: transferEvents.map((item:any) => item.count)
        },
        {
            name: "BurnEvent",
            data: burnEvents.map((item:any) => item.count)
        }
    ]

    const optionData = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%'
        },
        plotOptions: {
        bar: {
            vertical: true,
        },
        },
        stroke: {
            width: 1,
            colors: ['#000000']
        },
        title: {
            text: 'Events by Stash'
        },
        xaxis: {
            categories: unique_stash_ids,
        },
        tooltip: {
            width: 1,
            colors: ['#000000']
        },
        fill: {
            opacity: 100
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    }

      
    return (
        <div>
            <div id="chart">
            <Chart options={optionData} series={seriesData} type="bar" stacked={true} height={350} />
            </div>
        </div>
    );
}

const StatsPage = () => {
    const user = getUserData();
    const userStashes = user.stashes;
    const [selectedEvent, setSelectedEvent] = useState("DepositEvent");
    const [selectedStash, setSelectedStash] = useState(6);
    const [popular, setPopular] = useState<any[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [eventCounts, setEventCounts] = useState([]);

    useEffect(() => {
        (async() => {
            const events = await get_transactions_by_event(selectedStash, selectedEvent); 
            const popular_txs = await popular_uses();
            const event_counts = await get_event_counts();
            setEvents(events.data);

            

            setEventCounts(event_counts.data);
            console.log("event counts ", event_counts.data);
            setPopular(popular_txs.data);
        })();
    }, []);

    const handleStashChange = (e: any) => {
        setSelectedStash(e.target.value);
    }

   


    return (

        <div className="w-full items-start h-full justify-center">
            <p>Get count of each event type in stash</p>
             <StackedBarChartWrapper />

            <p>Get all transactions associated with event type</p>
            <div className="flex flex-row justify-start items-center">
                <div>
                    <p>Event type</p>
                    <input type="text" className={BASE_TYPES.BASE_INPUT} value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}/>
                </div>
                <div>
                    <p>Stash id</p>
                    <select className={BASE_TYPES.BASE_INPUT}
                        onChange={(e)=>handleStashChange(e)}
                    >
            {userStashes.map((stash: any) => {
              return <option value={stash.id}>{stash.name}</option>;
            })}
          </select>


                    <input type="text" className={BASE_TYPES.BASE_INPUT} onChange={(e) => setSelectedStash(parseInt(e.target.value))}/>
                </div>
               
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

            <div className="items-center flex flex-row gap gap-2 ">
                <div>
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
            <BarChartWrapper
                options={{
                    chart: {
                      id: "basic-bar"
                    },
                    xaxis: {
                      categories: popular.map((tx: any) => {
                        return tx.function;
                        })
                    }
                  }
                }
                  series={[
                    {
                      name: "Counts",
                      data: popular.map((tx: any) => {
                        return tx.count;
                        })
                    }
                  ]
                }
            />
            </div>
        </div>);
};



export default StatsPage;