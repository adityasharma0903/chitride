import { ArrowLeft, Bell, CheckCheck, CircleAlert, MessageCircle, Ticket } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useRideContext } from "@/context/RideContext";
import { toast } from "sonner";

const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, markNotificationRead } = useRideContext();

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const getIcon = (kind: string) => {
    switch (kind) {
      case "request_sent":
        return MessageCircle;
      case "request_approved":
        return CheckCheck;
      case "request_rejected":
      case "ride_deleted":
        return CircleAlert;
      default:
        return Ticket;
    }
  };

  return (
    <div className="app-container desktop-premium-page bg-background min-h-screen pb-24 md:pb-8">
      <div className="relative px-4 pt-6 md:px-0 md:pt-0 md:max-w-[86rem] md:mx-auto md:min-h-[calc(100vh-9.5rem)] md:flex md:flex-col">
        <div className="flex items-center justify-between gap-3 mb-6 md:mb-5">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-foreground" aria-label="Back">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Notifications</h1>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {unreadCount} unread
          </span>
        </div>

        {notifications.length === 0 ? (
          <div className="rounded-3xl border border-border/70 bg-card/80 py-16 text-center md:flex-1 md:flex md:flex-col md:items-center md:justify-center md:backdrop-blur-xl">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">No notifications yet</p>
          </div>
        ) : (
          <div className="rounded-3xl border border-border/70 bg-card/65 p-4 md:p-5 md:flex-1 md:overflow-hidden md:backdrop-blur-xl">
            <div className="flex flex-col gap-3 md:grid md:h-full md:grid-cols-2 md:items-start md:content-start md:overflow-y-auto md:pr-1">
              {notifications.map((item) => {
                const Icon = getIcon(item.kind);
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      item.isRead ? "border-border bg-card" : "border-primary/20 bg-primary/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-full bg-secondary p-2 text-foreground">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                          <p className="mt-2 text-[11px] text-muted-foreground">
                            {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      {!item.isRead && (
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                          New
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={async () => {
                          const result = await markNotificationRead(item.id);
                          if (!result.success) {
                            toast.error(result.message);
                            return;
                          }
                          navigate(item.link);
                        }}
                        className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground"
                      >
                        Open
                      </button>
                      {!item.isRead && (
                        <button
                          type="button"
                          onClick={async () => {
                            const result = await markNotificationRead(item.id);
                            if (!result.success) {
                              toast.error(result.message);
                              return;
                            }
                            toast.success("Marked as read");
                          }}
                          className="rounded-xl border border-border bg-background px-4 py-2.5 text-xs font-semibold text-foreground"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Notifications;
