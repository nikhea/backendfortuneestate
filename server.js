import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import Express from "express";

const app = Express();

let port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
