import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import cors from "cors";
import  {db}  from "./src/db/index.js";
// db()
const app = express();
// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.options("*", cors());
let port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});



