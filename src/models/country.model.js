import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const countrySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
    },
    description: {
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
    continent: {
      type: Schema.Types.ObjectId,
      ref: "Continents",
    },
  },
  { timestamps: true }
);

const countries = mongoose.model("Countries", countrySchema);

export default countries;
