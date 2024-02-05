import * as mongoose from "mongoose";
import { positionModel } from "./PositionModel";

const vehicleShema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  positions: [positionModel],

  vehiclePlateNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});
export const vehiclesModel = mongoose.model("vehicles", vehicleShema);
