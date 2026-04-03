import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createRideFeedback, getMyFeedback, getUserReviews } from "../controllers/feedback.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/mine", getMyFeedback);
router.get("/users/:userId/reviews", getUserReviews);
router.post("/:rideId/feedback", createRideFeedback);

export default router;