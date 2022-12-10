import { MOCK_INFO } from "data/mock_info";
import { shortenAddress } from "formatting";
import {
  get_transactions_by_event,
  get_stashes_by_user,
  popular_uses,
  get_event_counts,
} from "hooks/useStats";
import { loadStashes } from "hooks/useUser";
import { useEffect, useState } from "react";
import { BASE_TYPES } from "styles/baseStyles";
import { getUserData } from "utils/SessionHelper";
import React from "react";
import Chart from "react-apexcharts";

interface BarProps {
  options: any;
  series: any;
}

const BarChartWrapper = ({ options, series }: BarProps) => {
  return (
    <div>
      <Chart options={options} series={series} type="bar" width="500" />
    </div>
  );
};

const StackedBarChart = (eventCounts: any) => {
  const initialData = eventCounts.eventCounts;
  const all_event_types = initialData.map((event: any) => ({
    name: event.eventType,
    data: [],
  }));

  const series_names = all_event_types.filter((value: any, index: number) => {
    return (
      all_event_types.findIndex((item: any) => item["name"] === value["name"]) === index
    );
  });

  const all_stash_ids = new Set(initialData.map((event: any) => event.stashId));
  const categories = Array.from(all_stash_ids).sort(); // get unique stash ids

  for (let i = 0; i < categories.length; i++) {
    // get all items from that stash
    const eventsByCategory = initialData.filter(
      (event: any) => event.stashId === categories[i]
    );

    // format the corresponding series data
    for (let j = 0; j < series_names.length; j++) {
      let item = eventsByCategory.find((o: any) => o.eventType === series_names[j].name);

      if (item) {
        series_names[j].data.push(item.count);
      } else {
        series_names[j].data.push(0);
      }
    }
  }

  return (
    <Chart
      options={{
        chart: {
          type: "bar",
          width: 100,
          height: 200,
          stacked: true,
          //   stackType: "100%",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              total: {
                enabled: true,
                offsetX: 10,
                style: {
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        stroke: {
          width: 3,
          colors: ["#fff"],
        },
        title: {
          text: "Get count of each event type in stash",
          style: {
            color: "#fff",
            fontSize: "20px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
          },
        },
        yaxis: {
          labels: {
            show: true,
            align: "right",
            minWidth: 0,
            maxWidth: 160,
            style: {
              colors: ["#fff"],
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
          },
          title: {
            text: "Stash Ids",
            offsetX: 10,
            offsetY: 0,
            style: {
              color: "white",
              fontSize: "15px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
        },
        xaxis: {
          title: {
            text: "Event Counts",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: "white",
              fontSize: "15px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              cssClass: "apexcharts-xaxis-title",
            },
          },
          categories: categories,
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
            style: {
              colors: ["#fff"],
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-xaxis-label",
            },
            offsetX: 0,
            offsetY: 0,
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
          labels: {
            colors: ["#fff"],
          },
        },
      }}
      series={series_names}
      type="bar"
    />
  );
};

const StatsPage = () => {
  const user = getUserData();
  const userStashes = user.stashes;
  const [selectedEvent, setSelectedEvent] = useState("DepositEvent");
  const [selectedStash, setSelectedStash] = useState(6);
  const [popular, setPopular] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [eventCounts, setEventCounts] = useState([]);

  useEffect(() => {
    (async () => {
      const events = await get_transactions_by_event(selectedStash, selectedEvent);
      const popular_txs = await popular_uses();
      const event_counts = await get_event_counts();
      setEvents(events.data);

      console.log("event counts ", event_counts.data);
      setEventCounts(event_counts.data);
      setPopular(popular_txs.data);
    })();
  }, []);

  const handleStashChange = (e: any) => {
    setSelectedStash(e.target.value);
  };

  return (
    <div className="w-full items-start h-full justify-center">
      {eventCounts.length > 0 && (
        <div className="w-8/12">
          <StackedBarChart eventCounts={eventCounts} />
        </div>
      )}

      <p>Get all transactions associated with event type</p>
      <div className="flex flex-row justify-start items-center">
        <div>
          <p>Event type</p>
          <input
            type="text"
            className={BASE_TYPES.BASE_INPUT}
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          />
        </div>
        <div>
          <p>Stash id</p>
          <select
            className={BASE_TYPES.BASE_INPUT}
            onChange={(e) => handleStashChange(e)}
          >
            {userStashes.map((stash: any) => {
              return <option value={stash.id}>{stash.name}</option>;
            })}
          </select>

          <input
            type="text"
            className={BASE_TYPES.BASE_INPUT}
            onChange={(e) => setSelectedStash(parseInt(e.target.value))}
          />
        </div>

        <button
          className={BASE_TYPES.BASE_BUTTON}
          onClick={() => {
            (async () => {
              const events = await get_transactions_by_event(
                selectedStash,
                selectedEvent
              );
              setEvents(events.data);
            })();
          }}
        >
          Query
        </button>
      </div>

      <div className="items-start">
        <p> Results </p>
        {events.length !== 0 &&
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
          {popular.length !== 0 &&
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
              id: "basic-bar",
            },
            xaxis: {
              categories: popular.map((tx: any) => {
                return tx.function;
              }),
            },
          }}
          series={[
            {
              name: "Counts",
              data: popular.map((tx: any) => {
                return tx.count;
              }),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default StatsPage;
