import * as mongoose from "mongoose";

const fleetShema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  plateNumbers: {
    type: [String],
  },
 
})
export const fleetModel = mongoose.model("fleet", fleetShema);