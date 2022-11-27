import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const continentSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true,
      lowercase: true,
    },
    bgImage: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    countries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Countries",
      },
    ],
  },
  { timestamps: true }
);

const Continents = mongoose.model("Continents", continentSchema);

export default Continents;
