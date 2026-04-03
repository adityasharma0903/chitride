import { NotificationModel } from "../models/Notification.model.js";

type NotificationKind = "request_sent" | "request_approved" | "request_rejected" | "booking_cancelled" | "ride_deleted";

export const createNotification = async (payload: {
  recipient: string;
  actor: string;
  ride: string;
  kind: NotificationKind;
  title: string;
  body: string;
  link: string;
}) => {
  return NotificationModel.create(payload);
};

export const createManyNotifications = async (
  payloads: Array<{
    recipient: string;
    actor: string;
    ride: string;
    kind: NotificationKind;
    title: string;
    body: string;
    link: string;
  }>
) => {
  if (!payloads.length) return [];
  return NotificationModel.insertMany(payloads);
};