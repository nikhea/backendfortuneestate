// Set up mongoose connection
import pkg from "mongoose";
const { MongoClient, ServerApiVersion } = pkg;

let dev_db_url = process.env.MONGODB_URI_LOCAL;
const mongoDB = dev_db_url || process.env.MONGODB_URI;
//const mongoDB = dev_db_url;

const client = new MongoClient(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  console.log(collection + " collection");
  console.log(client + " client");
});
export const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// mongoose.connect(mongoDB, {
//      useCreateIndex: true,
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
//      useFindAndModify: false,
//    });
//    mongoose.Promise = global.Promise;
//    export const db = mongoose.connection;

//    db.on("error", console.error.bind(console, "MongoDB connection error:"));
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { MongoClient, ServerApiVersion } = require('mongodb');
