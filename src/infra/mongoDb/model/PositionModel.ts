import * as mongoose from "mongoose";

export const positionModel = new mongoose.Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  alt: {
    type: Number,
    required: true,
  },
});
