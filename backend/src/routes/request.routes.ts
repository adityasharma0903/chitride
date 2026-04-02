import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import {
  getIncomingRequests,
  getMyBookings,
  updateRequestStatus,
} from "../controllers/rideRequest.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/incoming", getIncomingRequests);
router.get("/mine", getMyBookings);
router.patch("/:requestId/status", updateRequestStatus);

export default router;
