import { Router } from "express";
import multer from "multer";
import type { Request, Response, NextFunction } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { uploadImage } from "../controllers/upload.controller.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile?: boolean) => void) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"));
    }
  },
});

router.post("/image", requireAuth, upload.single("image"), uploadImage);

export default router;
