import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./Home.module.css";
import { AxisOptions, Chart } from "react-charts";

export default function Home() {
  const codeRef = useRef<HTMLDivElement | null>(null);
  let [data, setData] = useState<Root | null>(null);
  let [eventsByMonth, setEventsByMonth] = useState<
    Record<string, number> | null
  >(null);

  useEffect(() => {
    if (!data) return;

    const counts: Record<string, number> = {};

    for (const event of data.value) {
      const date = new Date(event.startsOn);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")
        }`; // Format like "2024-06"

      counts[month] = (counts[month] || 0) + 1;
    }

    setEventsByMonth(counts);
  }, [data]);

  const reloadData = async (ev: MouseEvent<HTMLButtonElement>) => {
    let target = ev.currentTarget;
    target.disabled = true;

    try {
      const body = {
        orderByField: "endsOn",
        orderByDirection: "ascending",
        status: "Approved",
        take: "2147483647",
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL!}/reload`,
        {
          method: "POST",
          body: JSON.stringify(body),
        },
      );

      setData(await response.json());
    } catch (err) {
      console.error(err);
      alert("Something went wrong...");
    } finally {
      target.disabled = false;
    }
  };

  const getDataFromStorage = async (ev: MouseEvent<HTMLButtonElement>) => {
    let target = ev.currentTarget;
    target.disabled = true;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL!}/events`,
      );

      if (!response.ok) {
        alert(
          "Failed to get data from storage. This may mean you need to fetch the data first.",
        );
        return;
      }

      const events = await response.json();

      setData(events);
    } catch (err) {
      alert("Something went wrong...");
      console.error(err);
    } finally {
      target.disabled = false;
    }
  };

  return (
    <Container>
      <h1>
        Summary
      </h1>
      <br />
      <Button variant="secondary" onClick={getDataFromStorage}>
        Fetch Data From Storage
      </Button>
      <Button variant="primary" onClick={reloadData}>
        Reload Data
      </Button>
      <div className={styles.code}>
        <code id="code" ref={codeRef}>
          {data && JSON.stringify(data.value)}
        </code>
      </div>
      {eventsByMonth && <Analysis eventsByMonth={eventsByMonth} />}
    </Container>
  );
}

function Analysis(
  { eventsByMonth }: { eventsByMonth: Record<string, number> },
) {
  console.log(eventsByMonth);
  type Event = {
    date: Date;
    count: number;
  };

  const data = useMemo(() => [
    {
      label: "Events",
      data: Object.entries(eventsByMonth)
        .map(([month, count]) => ({
          date: new Date(month + "-01"), // parse to Date
          count: count,
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime()),
    },
  ], []);

  console.log(data);

  const primaryAxis = useMemo((): AxisOptions<Event> => ({
    getValue: (datum) => datum.date,
    scaleType: "time",
  }), []);

  const secondaryAxis = useMemo((): AxisOptions<Event>[] => [
    {
      getValue: (datum: any) => datum.count,
    },
  ], []);

  return (
    <div>
      <h2>Analysis</h2>
      <h3>Events Per Month</h3>
      <div style={{ width: "600px", height: "300px" }}>
        <Chart options={{ data, primaryAxis, secondaryAxes: secondaryAxis }} />
      </div>
    </div>
  );
}
