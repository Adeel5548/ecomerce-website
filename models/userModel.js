// models/userModel.js
import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: Number, default: 0 },

    // ✅ Reset password support
    resetPasswordToken: { type: String },         // hashed token
    resetPasswordExpire: { type: Date },          // expiry time
  },
  { timestamps: true }
);

/**
 * Instance method: generate and set password reset token
 * - returns the raw token (to email)
 * - saves hashed token + expiry on document (not saved yet)
 */
userSchema.methods.generatePasswordReset = function () {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(rawToken).digest("hex");

  this.resetPasswordToken = hashed;
  const mins = Number(process.env.RESET_TOKEN_EXPIRE_MINUTES || 15);
  this.resetPasswordExpire = Date.now() + mins * 60 * 1000;

  return rawToken;
};

export default mongoose.model("user", userSchema);
