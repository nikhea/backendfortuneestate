import * as mongoose from "mongoose";
Schema = mongoose.Schema;

const continentSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    bgImage: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

let continents = mongoose.model("continents", continentSchema);

export default continents;
