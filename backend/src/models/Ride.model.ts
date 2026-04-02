import { Schema, model, type InferSchemaType, Types } from "mongoose";

const rideSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    ownerSnapshot: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
      phone: { type: String, required: true },
      branch: { type: String, required: true },
      year: { type: String, required: true },
    },
    from: { type: String, required: true, trim: true, index: true },
    to: { type: String, required: true, trim: true, index: true },
    date: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, default: "" },
    pricePerSeat: { type: Number, required: true, min: 1 },
    seatsAvailable: { type: Number, required: true, min: 1 },
    seatsTotal: { type: Number, required: true, min: 1 },
    carModel: { type: String, required: true, trim: true },
    carNumberPlate: { type: String, required: true, trim: true, uppercase: true },
    carImageUrl: { type: String, default: "" },
    paymentMethod: { type: String, default: "Cash" },
    repeatDays: { type: [String], default: [] },
    status: { type: String, enum: ["active", "cancelled"], default: "active", index: true },
  },
  { timestamps: true }
);

rideSchema.index({ createdAt: -1 });

export type RideDocument = InferSchemaType<typeof rideSchema> & {
  _id: Types.ObjectId;
};

export const RideModel = model("Ride", rideSchema);
