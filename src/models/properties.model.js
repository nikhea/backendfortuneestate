import * as mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import {
  category,
  propertyType,
  ListingType,
  View,
} from "../utils/constants.js";

mongoose.plugin(slug);
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
const websiteCopySchema = new Schema({
  // listingID: { type: String, required: true },
  webSiteName: { type: String, required: true, lowercase: true },
  webSiteURL: { type: String, required: true },
});
const propertiesSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      lowercase: true,
    },
    pageTitle: {
      type: String,
      require: true,
      lowercase: true,
    },
    slug: { type: String, slug: ["title", "pageTitle"], unique: true },

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
    listingType: {
      type: String,
      enum: [ListingType.forSale, ListingType.forRent],
      lowercase: true,
      require: true,
    },
    view: {
      type: String,
      enum: [View.garden, View.sea, View.street],
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
      type: Number,
    },
    lotAreaSymbol: {
      type: String,
      lowercase: true,
      require: true,
    },
    images: {
      type: [String],
    },
    image: {
      type: String,
      require: true,
    },
    address: addressSchema,
    websiteCopy: websiteCopySchema,
    country: {
      type: Schema.Types.ObjectId,
      ref: "Countries",
    },
    agent: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const properties = mongoose.model("Properties", propertiesSchema);

export default properties;
