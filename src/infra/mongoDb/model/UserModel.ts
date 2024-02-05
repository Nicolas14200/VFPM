import * as mongoose from "mongoose";

const userShema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
  },
  fleet: {
    type: [String],
    required: true,
  },
 
})
export const userModel = mongoose.model("user", userShema);