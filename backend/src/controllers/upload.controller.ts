import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { uploadToCloudinary } from "../services/upload.service.js";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { UserModel } from "../models/User.model.js";

export const uploadImage = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.file) {
    throw new AppError("No file uploaded", 400);
  }

  const type = req.query.type as string | undefined;
  if (!type || !["profile", "car"].includes(type)) {
    throw new AppError("Invalid upload type. Must be 'profile' or 'car'", 400);
  }

  try {
    const imageUrl = await uploadToCloudinary(req.file.buffer, type);

    // Update user profile image if uploading profile picture
    if (type === "profile" && req.user) {
      await UserModel.findByIdAndUpdate(req.user.id, {
        profileImageUrl: imageUrl,
      });
    }

    res.json({
      success: true,
      imageUrl,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image upload failed";
    throw new AppError(message, 500);
  }
});
