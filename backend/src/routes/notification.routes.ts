import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getMyNotifications, markNotificationAsRead } from "../controllers/notification.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", getMyNotifications);
router.patch("/:notificationId/read", markNotificationAsRead);

export default router;