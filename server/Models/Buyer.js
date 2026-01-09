import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Buyer", buyerSchema);
