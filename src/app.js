import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./db/index.js";
import Continents from "./routes/continent.routes.js";
import Countries from "./routes/countries.routes.js";
import Properties from "./routes/properties.routes.js";
import Users from "./routes/user.routes.js";
import Auth from "./routes/auth.routes.js";
import Profile from "./routes/profile.routes.js";
import morgan from "morgan";
import { main_URL } from "./utils/constants.js";
// const uploas =
const app = express();
app.get("/", (req, res) => {
  try {
    res.json({
      status: "2000",
      data: {
        Continents: `${main_URL}continents`,
        Continent: `${main_URL}continents/:continentname`,
        countries: `${main_URL}countries`,
        countrie: `${main_URL}countries/countriename`,
        properties: `${main_URL}properties`,
        poperty: `${main_URL}:countriename/properties`,
        users: `${main_URL}user`,
      },
      Message: "success",
    });
  } catch (error) {
    let response = {
      statuscode: 400,
      error: error,
      message: "something failed",
    };
    return res.json(response);
  }
});
app.get("/task", (req, res) => {
  try {
    res.json({
      status: "200",
      data: "task",
      Message: "success",
    });
  } catch (error) {
    let response = {
      statuscode: 400,
      error: error,
      message: "something failed",
    };
    return res.json(response);
  }
});

// Init Middleware
// body parser configuration
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
// app.use("/api",express.static('./imageServices/uploads'))
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));

app.use("/api/auth", Auth);
app.use("/api/user", Users);
app.use("/api/profile", Profile);
app.use("/api/continents", Continents);
app.use("/api/", Countries);
app.use("/api/", Properties);

export default app;
