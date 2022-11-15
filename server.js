import express from "express"

const app = express()



let port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});