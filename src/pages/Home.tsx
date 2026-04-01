import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import RideCard from "@/components/RideCard";
import { useRideContext } from "@/context/RideContext";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const { rides, sendRequest } = useRideContext();

  return (
    <div className="app-container bg-background min-h-screen pb-24">
      {/* Map placeholder */}
      <div className="relative h-56 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Map View</p>
          </div>
        </div>
        {/* Search bar */}
        <div className="absolute bottom-4 left-4 right-16">
          <button
            onClick={() => navigate("/search")}
            className="w-full bg-card rounded-xl px-4 py-3 flex items-center gap-3 shadow-md border border-border"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Where are you going?</span>
          </button>
        </div>
        {/* Location button */}
        <button className="absolute bottom-4 right-4 bg-card w-10 h-10 rounded-xl flex items-center justify-center shadow-md border border-border">
          <MapPin className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Nearby Rides */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Nearby Rides</h2>
          <button className="flex items-center gap-1 text-xs text-muted-foreground">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {rides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              onRequest={() => {
                sendRequest(ride.id);
                toast.success(`Ride request sent to ${ride.driverName}!`);
              }}
            />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
