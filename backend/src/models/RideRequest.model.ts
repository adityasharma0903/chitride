import { Schema, model, type InferSchemaType, Types } from "mongoose";

const rideRequestSchema = new Schema(
  {
    ride: { type: Schema.Types.ObjectId, ref: "Ride", required: true, index: true },
    rideOwner: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    requester: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    requesterSnapshot: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
    },
    seatsRequested: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    respondedAt: { type: Date },
  },
  { timestamps: true }
);

rideRequestSchema.index({ ride: 1, requester: 1, createdAt: -1 });
rideRequestSchema.index({ rideOwner: 1, status: 1, createdAt: -1 });

export type RideRequestDocument = InferSchemaType<typeof rideRequestSchema> & {
  _id: Types.ObjectId;
};

export const RideRequestModel = model("RideRequest", rideRequestSchema);
