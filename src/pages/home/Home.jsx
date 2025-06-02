import { useRef } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./Home.module.css";

export default function Home() {
  /**@type {import('react').RefObject<HTMLDivElement>}*/
  const codeRef = useRef();

  const reloadData = async () => {
    const response = await fetch(
      "https://unofficial-engage-api-hwdyg9e4cydbf9a3.eastus-01.azurewebsites.net/events",
      {
        method: "POST",
      },
    );

    const data = await response.json();

    console.log(data);

    codeRef.current.textContent = JSON.stringify(data);
  };

  return (
    <Container>
      <h1>
        Summary
      </h1>
      <Button variant="primary" onClick={reloadData}>
        Get Info
      </Button>
      <div className={styles.code}>
        <code id="code" ref={codeRef}>
          console.log("Hello world!");
        </code>
      </div>
    </Container>
  );
}
