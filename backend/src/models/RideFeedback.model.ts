import { Schema, model, type InferSchemaType, Types } from "mongoose";

const rideFeedbackSchema = new Schema(
  {
    ride: { type: Schema.Types.ObjectId, ref: "Ride", required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    targetUser: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    kind: { type: String, enum: ["review", "report"], required: true, index: true },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

rideFeedbackSchema.index({ ride: 1, author: 1, kind: 1 }, { unique: true });

export type RideFeedbackDocument = InferSchemaType<typeof rideFeedbackSchema> & {
  _id: Types.ObjectId;
};

export const RideFeedbackModel = model("RideFeedback", rideFeedbackSchema);