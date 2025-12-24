import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength:[6,'Password must be atleast 6 characters']
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
    role: {
      type: String,
      enum: ['seller', 'admin'],
      default: 'seller',
    },
  },
  { timestamps: true }
);


// Hash password before saving
sellerSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

export default model('Seller', sellerSchema);
