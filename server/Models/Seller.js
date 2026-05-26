import { Schema, model } from "mongoose";

const sellerSchema = new Schema(
  {
    // Connected user account
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic seller info
    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    ownerName: {
      type: String,
      trim: true,
    },

    gstNumber: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // Address
    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },


    // Approval system
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      trim: true,
    },

    // Metrics
    totalProducts: {
      type: Number,
      default: 0,
    },

    totalOrders: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Seller", sellerSchema);