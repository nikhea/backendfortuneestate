import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import cors from "cors";
import { db } from "./src/db/index.js";
import Continents from "./src/routes/continent.routes.js";
import Countries from "./src/routes/countries.routes.js";
import Properties from "./src/routes/properties.routes.js";
const app = express();
app.get("/", (req, res) => {
  res.json({ status: "2000" });
});
// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.options("*", cors());

app.use("/api/continents", Continents);
app.use("/api/", Countries);
app.use("/api/properties", Properties);
let port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
