import fs from "fs";

export const getData = (): Root => {
  const text = fs.readFileSync("./data.json", { encoding: "utf8" });
  return JSON.parse(text) as Root;
};

export const saveData = (data: Root) => {
  fs.writeFileSync("./data.json", JSON.stringify(data), { encoding: "utf8" });
};
