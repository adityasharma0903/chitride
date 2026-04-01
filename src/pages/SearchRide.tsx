import { useState } from "react";
import { ArrowLeft, MapPin, Plus, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import RideCard from "@/components/RideCard";
import { useRideContext } from "@/context/RideContext";
import { toast } from "sonner";

const SearchRide = () => {
  const navigate = useNavigate();
  const { rides, sendRequest } = useRideContext();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filteredRides = rides.filter((r) => {
    const matchFrom = !from || r.from.toLowerCase().includes(from.toLowerCase());
    const matchTo = !to || r.to.toLowerCase().includes(to.toLowerCase());
    return matchFrom && matchTo;
  });

  return (
    <div className="app-container bg-background min-h-screen pb-24">
      <div className="px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Search</h1>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <input
              type="text"
              placeholder="Pickup location"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
            <div className="w-2 h-2 rounded-full border-2 border-foreground" />
            <input
              type="text"
              placeholder="Drop-off location"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Plus className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Available Rides</h2>
          <button className="flex items-center gap-1 text-xs text-muted-foreground">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {filteredRides.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No rides found. Try different locations.</p>
          ) : (
            filteredRides.map((ride) => (
              <RideCard
                key={ride.id}
                ride={ride}
                onRequest={() => {
                  sendRequest(ride.id);
                  toast.success(`Ride request sent to ${ride.driverName}!`);
                }}
              />
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SearchRide;
