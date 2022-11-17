import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

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

const Continents = mongoose.model("continents", continentSchema);

export default Continents;
