import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./db/index.js";
import cloudinary from "./cloudinary/cloudinary.js";
import Continents from "./routes/continent.routes.js";
import Countries from "./routes/countries.routes.js";
import Properties from "./routes/properties.routes.js";
import Users from "./routes/user.routes.js";
import Auth from "./routes/auth.routes.js";
import morgan from "morgan"
const app = express();
app.get("/", (req, res) => {
  res.json({ status: "2000" });
});

// Init Middleware
// body parser configuration
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use(cors());
app.options("*", cors());
app.use(morgan('tiny'))

app.use("/api/auth", Auth);
app.use("/api/user", Users);
app.use("/api/continents", Continents);
app.use("/api/", Countries);
app.use("/api/", Properties);

export default app;
