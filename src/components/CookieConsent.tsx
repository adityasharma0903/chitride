import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import { toast } from "sonner";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    toast.success("Cookie preferences saved.");
  };

  const handleOutsideClick = () => {
    toast.info("First accept cookies to continue.");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleOutsideClick}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-xl shadow-2xl max-w-md w-full">
          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Icon and header */}
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-primary flex-shrink-0" />
              <h3 className="font-semibold text-lg text-foreground">
                We use cookies
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              We use essential cookies for authentication and functional cookies
              to enhance your experience. Your tokens (access & refresh) are
              stored in secure, httpOnly cookies. No tracking or analytics
              cookies are used.
            </p>

            {/* Action buttons */}
            <div className="flex gap-3 sm:gap-2">
              <button
                onClick={handleAccept}
                className="w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
