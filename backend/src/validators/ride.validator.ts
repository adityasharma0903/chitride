import { z } from "zod";

export const createRideSchema = z.object({
  from: z.string().min(2),
  to: z.string().min(2),
  date: z.string().min(4),
  departureTime: z.string().min(1),
  arrivalTime: z.string().optional().default(""),
  seats: z.coerce.number().int().min(1).max(6),
  pricePerSeat: z.coerce.number().positive(),
  carModel: z.string().min(2),
  carNumberPlate: z.string().min(4),
  carImageUrl: z.string().optional().default(""),
  paymentMethod: z.string().optional().default("Cash"),
  repeatDays: z.array(z.string()).optional().default([]),
});

export const updateRequestStatusSchema = z.object({
  status: z.enum(["approved", "rejected"]),
});

export const createRideRequestSchema = z.object({
  seatsRequested: z.coerce.number().int().min(1).max(6),
});
