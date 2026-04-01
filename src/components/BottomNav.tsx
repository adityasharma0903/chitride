import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Plus, User, Bell } from "lucide-react";
import { useRideContext } from "@/context/RideContext";

const tabs = [
  { icon: Home, path: "/home", label: "Home" },
  { icon: Search, path: "/search", label: "Search" },
  { icon: Plus, path: "/post-ride", label: "Post", isCenter: true },
  { icon: Bell, path: "/notifications", label: "Alerts" },
  { icon: User, path: "/profile", label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getRequestsForMyRides } = useRideContext();

  const pendingCount = getRequestsForMyRides().filter(
    (r) => r.status === "pending"
  ).length;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50">
      <div className="bg-nav rounded-t-3xl px-4 py-3 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          if (tab.isCenter) {
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center -mt-6 shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          }

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`relative flex flex-col items-center gap-0.5 transition-colors ${
                isActive ? "text-nav-active" : "text-nav-foreground/60"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {tab.label === "Alerts" && pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
