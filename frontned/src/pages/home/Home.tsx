import { MouseEvent, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./Home.module.css";

export default function Home() {
  const codeRef = useRef<HTMLDivElement | null>(null);
  let [data, setData] = useState({ hello: "world!" });

  //BUG: CORS makes this impossible. Server is required.
  const getDataFromWeb = async (ev: MouseEvent<HTMLButtonElement>) => {
    let target = ev.currentTarget;
    target.disabled = true;

    try {
      let params = new URLSearchParams();
      params.append("orderByField", "endsOn");
      params.append("orderByDirection", "ascending");
      params.append("status", "Approved");
      params.append("take", "2147483647");

      const response = await fetch(
        `https://valenciacollege.campuslabs.com/engage/api/discovery/event/search?${params}`,
        {
          method: "GET",
          headers: [
            ["Access-Control-Allow-Origin", "*"],
          ],
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

  const storeToBrowser = async (ev: MouseEvent<HTMLButtonElement>) => {
    let target = ev.currentTarget;
    target.disabled = true;

    try {
      localStorage.setItem("data", JSON.stringify(data));
      alert("Data now in storage.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong...");
    } finally {
      ev.currentTarget.disabled = false;
    }
  };

  const getDataFromBrowser = async (ev: MouseEvent<HTMLButtonElement>) => {
    let target = ev.currentTarget;
    target.disabled = true;

    try {
      let data = localStorage.getItem("data");

      if (!data) {
        alert("No data found in browser storage.");
        return;
      }

      setData(JSON.parse(data));
    } catch (err) {
      alert("Something went wrong...");
      console.error(err);
    } finally {
      target.disabled = false;
    }
  };

  const clearDataStorage = async (ev: MouseEvent<HTMLButtonElement>) => {
    let target = ev.currentTarget;
    target.disabled = true;

    try {
      localStorage.removeItem("data");
      alert("All data cleared.");
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
      <Button variant="secondary" onClick={getDataFromBrowser}>
        Fetch Data From Storage
      </Button>
      <Button variant="primary" onClick={getDataFromWeb}>
        Fetch Data From Web
      </Button>
      <Button variant="warning" onClick={storeToBrowser}>
        Store Data to Storage
      </Button>
      <Button variant="warning" onClick={clearDataStorage}>
        Clear Storae
      </Button>
      <div className={styles.code}>
        <code id="code" ref={codeRef}>
          {JSON.stringify(data)}
        </code>
      </div>
    </Container>
  );
}
