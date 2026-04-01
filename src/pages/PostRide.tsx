import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, Car, DollarSign, Users, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { useRideContext } from "@/context/RideContext";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PostRide = () => {
  const navigate = useNavigate();
  const { addRide, currentUser } = useRideContext();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(1);
  const [price, setPrice] = useState("");
  const [carModel, setCarModel] = useState("");
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const toggleDay = (day: string) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !date || !time || !price || !carModel) {
      toast.error("Please fill in all fields.");
      return;
    }
    const newRide = {
      id: crypto.randomUUID(),
      driverName: currentUser.name || "You",
      carModel,
      from,
      to,
      departureTime: time,
      arrivalTime: "",
      pricePerMile: `₹${price}`,
      seats,
      eta: "—",
      avatar: (currentUser.name || "Y").slice(0, 2).toUpperCase(),
    };
    addRide(newRide);
    toast.success("Ride posted successfully!");
    navigate("/home");
  };

  return (
    <div className="app-container bg-background min-h-screen pb-24">
      <div className="px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">Post Ride</h1>
        </div>

        <form onSubmit={handlePost} className="flex flex-col gap-4">
          {/* Route */}
          <div className="flex flex-col gap-3">
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
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Departure */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Departure</label>
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
                />
              </div>
              <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Seats */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Seats Available</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeats(s)}
                  className={`w-12 h-10 rounded-xl text-sm font-semibold transition-colors ${
                    seats === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Car */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-semibold text-foreground mb-2 block">Price/mile</label>
              <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <input
                  type="number"
                  step="0.5"
                  placeholder="4.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-foreground mb-2 block">Car Details</label>
              <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
                <Car className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Honda City"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Repeat */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">🔁 Repeat</label>
            <div className="flex gap-2 flex-wrap">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-2 rounded-full text-xs font-semibold transition-colors ${
                    repeatDays.includes(day)
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Payment Method</label>
            <div className="flex gap-2">
              {["Cash", "Cards", "Paypal"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    paymentMethod === method
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-foreground text-card w-full py-4 rounded-2xl font-semibold text-sm mt-4 hover:opacity-90 transition-opacity"
          >
            Post Ride
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
};

export default PostRide;
