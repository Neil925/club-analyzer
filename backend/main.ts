import express from "express";
import cors from "cors";
import * as store from "./store.ts";
import { consolidateData } from "./helpers.ts";

const app = express();
const port = process.env.PORT ?? "3000";

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"] }));

app.get("/events", async (_req, res) => {
  try {
    res.send(store.getData());
  } catch (err) {
    console.error(err);
    res.status(400).send("An error has occured...");
  }
});

app.post("/reload", async (req, res) => {
  try {
    let params = new URLSearchParams(req.body);

    const response = await fetch(
      `https://valenciacollege.campuslabs.com/engage/api/discovery/event/search?${params}`,
    );
    let data = await response.json() as Root;
    if (store.fileExists()) {
      data = consolidateData(store.getData(), data);
    }
    store.saveData(data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(400).send("An error has occured...");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Now listening on port " + port);
});
