import { Schema, model } from "mongoose";

const sellerSchema = new Schema(
  {
    // Link to main User account
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Seller", sellerSchema);
