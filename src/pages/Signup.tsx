import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Mail, Lock, User, ArrowRight } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@chitkara.edu.in")) {
      setError("Only Chitkara University email IDs (@chitkara.edu.in) are allowed.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    localStorage.setItem("easyride_user", JSON.stringify({ email, name }));
    navigate("/home");
  };

  return (
    <div className="app-container flex flex-col bg-background min-h-screen px-6 py-10">
      <div className="flex items-center gap-2 mb-12">
        <div className="bg-primary rounded-full p-2">
          <Car className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">
          Easy <span className="text-primary">Ride</span>
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Create Account</h1>
        <p className="text-muted-foreground text-sm">Join Chitkara's carpooling community</p>
      </div>

      <form onSubmit={handleSignup} className="flex flex-col gap-4 flex-1">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
            required
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            placeholder="yourname@chitkara.edu.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
            required
          />
        </div>

        {error && (
          <p className="text-destructive text-xs font-medium px-1">{error}</p>
        )}

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mt-4 transition-colors"
        >
          Create Account <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-muted-foreground text-xs mt-2">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")} className="text-primary font-semibold">
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
