import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createRide, deleteRide, getMyRides, getRideById, getRides, updateRide } from "../controllers/ride.controller.js";
import { getMyRequestForRide, requestRide } from "../controllers/rideRequest.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", getRides);
router.get("/mine", getMyRides);
router.post("/", createRide);
router.patch("/:rideId", updateRide);
router.delete("/:rideId", deleteRide);
router.get("/:rideId", getRideById);
router.post("/:rideId/requests", requestRide);
router.get("/:rideId/my-request", getMyRequestForRide);

export default router;
