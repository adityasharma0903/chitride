import crypto from "crypto";
import { env } from "../config/env.js";

export const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

export const hashOtp = (otp: string) =>
  crypto.createHmac("sha256", env.OTP_SECRET).update(otp).digest("hex");

export const verifyOtpHash = (otp: string, hash: string) => hashOtp(otp) === hash;
