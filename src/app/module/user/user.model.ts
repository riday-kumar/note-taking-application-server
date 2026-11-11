import { Schema, model } from "mongoose";
import { IUser } from "./user.interface.js";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    interests: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
userSchema.index({ email: 1 }, { unique: true });

userSchema.index({
  createdAt: -1,
  _id: -1,
});

// Model
const User = model<IUser>("User", userSchema);

export default User;
