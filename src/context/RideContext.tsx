import React, { createContext, useContext, useState, useCallback } from "react";
import type { Ride } from "@/components/RideCard";
import { mockRides as initialMockRides } from "@/data/mockRides";

export interface RideRequest {
  id: string;
  rideId: string;
  requesterName: string;
  requesterEmail: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  rideId: string;
  senderName: string;
  senderRole: "requester" | "offerer";
  text: string;
  timestamp: string;
}

interface RideContextType {
  rides: Ride[];
  addRide: (ride: Ride) => void;
  requests: RideRequest[];
  sendRequest: (rideId: string) => void;
  approveRequest: (requestId: string) => void;
  rejectRequest: (requestId: string) => void;
  getRequestForRide: (rideId: string) => RideRequest | undefined;
  getRequestsForMyRides: () => RideRequest[];
  chatMessages: ChatMessage[];
  sendMessage: (rideId: string, text: string, senderRole: "requester" | "offerer") => void;
  getMessagesForRide: (rideId: string) => ChatMessage[];
  currentUser: { name: string; email: string };
}

const RideContext = createContext<RideContextType | null>(null);

export const useRideContext = () => {
  const ctx = useContext(RideContext);
  if (!ctx) throw new Error("useRideContext must be used within RideProvider");
  return ctx;
};

export const RideProvider = ({ children }: { children: React.ReactNode }) => {
  const [rides, setRides] = useState<Ride[]>(initialMockRides);
  const [requests, setRequests] = useState<RideRequest[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const stored = localStorage.getItem("easyride_user");
  const currentUser = stored
    ? JSON.parse(stored)
    : { name: "Student", email: "student@chitkara.edu.in" };

  const addRide = useCallback((ride: Ride) => {
    setRides((prev) => [ride, ...prev]);
  }, []);

  const sendRequest = useCallback(
    (rideId: string) => {
      const existing = requests.find(
        (r) => r.rideId === rideId && r.requesterEmail === currentUser.email
      );
      if (existing) return;
      const req: RideRequest = {
        id: crypto.randomUUID(),
        rideId,
        requesterName: currentUser.name,
        requesterEmail: currentUser.email,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setRequests((prev) => [...prev, req]);
    },
    [requests, currentUser]
  );

  const approveRequest = useCallback((requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "approved" } : r))
    );
  }, []);

  const rejectRequest = useCallback((requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: "rejected" } : r))
    );
  }, []);

  const getRequestForRide = useCallback(
    (rideId: string) =>
      requests.find(
        (r) => r.rideId === rideId && r.requesterEmail === currentUser.email
      ),
    [requests, currentUser]
  );

  const getRequestsForMyRides = useCallback(() => {
    // In mock mode, show all requests (as if current user is the offerer)
    return requests;
  }, [requests]);

  const sendMessage = useCallback(
    (rideId: string, text: string, senderRole: "requester" | "offerer") => {
      const msg: ChatMessage = {
        id: crypto.randomUUID(),
        rideId,
        senderName: currentUser.name,
        senderRole,
        text,
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, msg]);
    },
    [currentUser]
  );

  const getMessagesForRide = useCallback(
    (rideId: string) => chatMessages.filter((m) => m.rideId === rideId),
    [chatMessages]
  );

  return (
    <RideContext.Provider
      value={{
        rides,
        addRide,
        requests,
        sendRequest,
        approveRequest,
        rejectRequest,
        getRequestForRide,
        getRequestsForMyRides,
        chatMessages,
        sendMessage,
        getMessagesForRide,
        currentUser,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};
