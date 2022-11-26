import * as mongoose from "mongoose";
import { category, propertyType, ListingType, View } from "../utils/constants";

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});
const propertiesSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    pageTitle: {
      type: String,
      unique: true,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      enum: [category.commercial, category.land, category.residential],
      lowercase: true,
      require: true,
    },

    propertyType: {
      type: String,
      enum: [
        propertyType.office,
        propertyType.apartment,
        propertyType.land,
        propertyType.villa,
      ],
      lowercase: true,
      require: true,
    },
    ListingType: {
      type: String,
      enum: [ListingType.forRent, ListingType.forRent],
      lowercase: true,
      require: true,
    },
    View: {
      type: String,
      enum: [View.Garden, View.sea, View.street],
      lowercase: true,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    priceSymbol: {
      type: String,
      lowercase: true,
      require: true,
    },
    bedrooms: {
      type: Number,
      require: true,
    },
    bathrooms: {
      type: Number,
      require: true,
    },
    halfBathrooms: {
      type: Number,
    },
    squareFootage: {
      type: Number,
      require: true,
    },
    squareSymbol: {
      type: String,
      lowercase: true,
      require: true,
    },
    yearBuilt: {
      type: Number,
    },
    lotArea: {
      type: Number
    },
    lotAreaSymbol: {
      type: String,
    },
    images: {
      type: [String],
    },
    image: {
      type: String,
    },
    street: addressSchema,
    countries: {
      type: Schema.Types.ObjectId,
      ref: "Countries",
    },
  },
  { timestamps: true }
);

const properties = mongoose.model("Properties", propertiesSchema);

export default properties;
