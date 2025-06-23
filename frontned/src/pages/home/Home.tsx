import { MouseEvent, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./Home.module.css";
import { EventsPerMonth } from "../../components/EventsPerMonth";
import { EventsPerClub } from "../../components/EventsPerClub";
import { Cohosted } from "../../components/Cohosted";

export default function Home() {
  let [data, setData] = useState<Root | null>(null);
  let [eventsByMonth, setEventsByMonth] = useState<
    Record<string, number> | null
  >(null);
  let [eventsByClub, setEventsByClub] = useState<Record<string, number> | null>(
    null,
  );
  let [cohosted, setCohosted] = useState<Record<string, number> | null>(
    null,
  );

  const reloadEventsByMonth = () => {
    const counts: Record<string, number> = {};

    for (const event of data!.value) {
      const date = new Date(event.startsOn);
      const month = `${date.getFullYear()}-${
        (date.getMonth() + 1)
          .toString()
          .padStart(2, "0")
      }`; // Format like "2024-06"

      counts[month] = (counts[month] || 0) + 1;
    }

    setEventsByMonth(counts);
  };

  const reloadEventsByClub = () => {
    const counts: Record<string, number> = {};

    for (const event of data!.value) {
      const clubs = event.organizationNames;

      for (const club of clubs) {
        counts[club] = (counts[club] || 0) + 1;
      }
    }

    setEventsByClub(counts);
  };

  const reloadCohosted = () => {
    const counts: Record<string, number> = {};

    for (const event of data!.value) {
      const clubs = event.organizationNames;

      if (clubs.length == 1) continue;

      for (const club of clubs) {
        counts[club] = (counts[club] || 0) + 1;
      }
    }

    setCohosted(counts);
  };

  useEffect(() => {
    if (!data) return;
    reloadEventsByMonth();
    reloadEventsByClub();
    reloadCohosted();
  }, [data]);

  const reloadData = async (ev: MouseEvent<HTMLButtonElement>) => {
    let target = ev.currentTarget;
    target.disabled = true;

    try {
      const body = {
        orderByField: "endsOn",
        orderByDirection: "descending",
        status: "Approved",
        take: "2147483647",
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL!}/reload`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: [
            ["Content-Type", "application/json"],
          ],
        },
      );

      const json: Root = await response.json();
      json.value.sort((a, b) => a.endsOn.localeCompare(b.endsOn));

      setData(json);
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

      const events: Root = await response.json();
      events.value.sort((a, b) => a.endsOn.localeCompare(b.endsOn));

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
      </div>
      <h2>Analysis</h2>
      {eventsByMonth && <EventsPerMonth eventsByMonth={eventsByMonth} />}
      {eventsByClub && <EventsPerClub eventsByClub={eventsByClub} />}
      {cohosted && <Cohosted cohosted={cohosted} />}
    </Container>
  );
}
