import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    //order lifescycle
    orderStatus: {
      type: String,
      enum: ["CREATED", "CONFIRMED", "DELIVERED", "CANCELLED"],
      default: "CREATED",
      required: true,
    },
    //Relationship between buyer , seller and product
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    //Product snapshot which is immutable
    productSnapshot: {
      name: { type: String, required: true },
      partNumber: { type: String },
      partNumberType: { type: String },
      fitments: { type: Array },
      priceAtOrderTime: { type: Number, required: true },
    },

    //buyer snapshot again immutable
    buyerSnapshot: {
      name: { type: String, required: true },
      address: { type: String, required: true },
    },

    //quantity and pricing
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    priceAtOrderTime: {
      type: Number,
      required: true,
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    //soft delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },

    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    //Lifecycle timestamps
    confirmedAt: Date,
    deliveredAt: Date,
    cancelledAt: Date,

    confirmedBy: {
      type: String,
      ref: "Admin",
      default: null,
    },
    cancelReason: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);
export default mongoose.model("Order", orderSchema);
