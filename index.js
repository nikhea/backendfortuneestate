import Http from "http";
import App from "./src/app.js";
const port = process.env.PORT;
const Server = Http.createServer(App);
Server.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
//     "webSiteURL": "https://www.luxuryestate.com/p128037603-chalet-for-sale-montevideo",
//   "webSiteName": "Luxury estate"
