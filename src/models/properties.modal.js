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
      enum: [ViewType.forRent, View.forSale],
      lowercase: true,
      require: true,
    },
    price: {
      type: Number,
      // lowercase: true,
      require: true,
    },
    priceSymbol: {
      type: String,
      lowercase: true,
      require: true,
    },
    bedrooms: {
      type: Number,
      // lowercase: true,
      require: true,
    },
    bathrooms: {
      type: Number,
      // lowercase: true,
      require: true,
    },
    halfBathrooms: {
      type: Number,
      // lowercase: true,
      require: true,
    },
    squareFootage: {
      type: Number,
      // lowercase: true,
      require: true,
    },
    squareSymbol: {
      type: String,
      lowercase: true,
      require: true,
    },
    yearBuilt: {
      type: Number,
      // lowercase: true,
      require: true,
    },
    lotArea: {
      type: Number,
      // lowercase: true,
      require: true,
    },
    lotAreaSymbol: {
      type: String,
      lowercase: true,
      require: true,
    },
    images: {
      type: [String],
      // require: true,
    },
    image: {
      type: String,
      // require: true,
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
