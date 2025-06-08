import express from "express";

const app = express();
const port = process.env.PORT ?? "3000";

app.use(express.json());

app.get("/events", (req, res) => {
  res.send("WIP");
});
app.get("/reload", (req, res) => {
  res.send("WIP");
});
app.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Now listening on port " + port);
});
