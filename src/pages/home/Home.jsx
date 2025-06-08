import { useRef } from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./Home.module.css";

export default function Home() {
  /**@type {import('react').RefObject<HTMLDivElement>}*/
  const codeRef = useRef();

  /**@type {import('react').RefObject<HTMLInputElement>}*/
  const secretRef = useRef();

  let interv;

  const reloadData = async () => {
    try {
      codeRef.current.textContent = "";
      interv = setInterval(() => codeRef.current.textContent += ".", 1000);

      const response = await fetch(
        "https://unofficial-engage-api-hwdyg9e4cydbf9a3.eastus-01.azurewebsites.net/events",
        {
          method: "GET",
        },
      );

      const data = await response.json();

      clearInterval(interv);

      console.log(data);

      codeRef.current.textContent = JSON.stringify(data);
    } catch (err) {
      console.error(err);
      clearInterval(interv);
      codeRef.current.textContent = "Something went wrong...";
    }
  };

  const sendPost = async () => {
    try {
      codeRef.current.textContent = "";
      interv = setInterval(() => codeRef.current.textContent += ".", 1000);

      const response = await fetch(
        "https://unofficial-engage-api-hwdyg9e4cydbf9a3.eastus-01.azurewebsites.net/prep/events",
        {
          method: "POST",
          headers: {
            "Authorization": secretRef.current.value,
          },
        },
      );

      const data = await response.json();

      clearInterval(interv);

      console.log(data);

      codeRef.current.textContent = JSON.stringify(data);
    } catch (err) {
      console.error(err);
      clearInterval(interv);
      codeRef.current.textContent = "Something went wrong...";
    }
  };

  return (
    <Container>
      <h1>
        Summary
      </h1>
      <div className={styles.secret}>
        <label>Secret key:</label>
        <input type="password" ref={secretRef} />
      </div>
      <br />
      <Button variant="primary" onClick={reloadData}>
        Get Info
      </Button>
      <Button variant="secondary" onClick={sendPost}>
        Post Update Request
      </Button>
      <div className={styles.code}>
        <code id="code" ref={codeRef}>
          console.log("Hello world!");
        </code>
      </div>
    </Container>
  );
}
