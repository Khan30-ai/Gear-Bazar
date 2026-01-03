import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    // Ownership
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    // Product info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    subcategory: {
      type: String,
      required: true,
    },

    partNumber: {
      type: String,
      required: true,
      trim: true,
    },

    partNumberType: {
      type: String,
      enum: ["OEM", "AFTERMARKET", "GENERIC"],
      required: true,
    },

    // Vehicle fitments 
    fitments: [
      {
        vehicleType: {
          type: String,
          enum: ["car", "bike"],
          required: true,
        },
        brand: {
          type: String,
          required: true,
        },
        model: {
          type: String,
          required: true,
        },
        variant: {
          type: String,
        },
        yearFrom: {
          type: Number,
        },
        yearTo: {
          type: Number,
        },
      },
    ],

    // Pricing & inventory
    price: {
      type: Number,
      required: true,
      min: 1,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    // Optional identifiers
    oemPartNumber: {
      type: String,
    },

    aftermarketBrand: {
      type: String,
    },
    // Images (optional at creation, required before approval)
    images: [
      {
        type: String,
      },
    ],

    // Approval workflow
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    // Idempotency  (for duplicate protection)
    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Product", ProductSchema);
