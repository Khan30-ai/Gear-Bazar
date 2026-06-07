import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    // Ownership
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },
    // Product info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
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

    partType: {
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
    mrp: {
      type: Number,
      required: true,
      min: 1,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    weightKg: {
      type: Number,
    },

    // Optional identifiers
    oemPartNumber: {
      type: String,
    },

    brand: {
      type: String,
      required: true,
    },
    // Images (optional at creation, required before approval)
    images: [
      {
        type: String,
      },
    ],
    warrantyMonths: {
      type: Number,
      default: 0,
    },


    //approval workflow 
    approval: {
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
        index: true,
      },
      approvedAt: {
        type: Date,
      },

      rejectedAt: {
        type: Date,
      },

      rejectionReason: {
        type: String,
        trim: true,
      },
      lastActionBy: {
        adminId: {
          type: Schema.Types.ObjectId,
        },
        adminName: {
          type: String,
        },
      },
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
