import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import {
  findAccountByEmail,
  isCollegeEmail,
  sanitizePhone,
  setCurrentUserFromAccount,
} from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const normalizedEmail = email.trim().toLowerCase();

    if (!isCollegeEmail(normalizedEmail)) {
      setError("Only Chitkara University email IDs (@chitkara.edu.in) are allowed.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const account = findAccountByEmail(normalizedEmail);
    if (!account) {
      setError("Account not found. Please sign up first.");
      return;
    }

    if (account.password !== password) {
      setError("Incorrect password.");
      return;
    }

    const nextOtp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(nextOtp);
    setEmail(normalizedEmail);
    setOtpStep(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.trim() !== generatedOtp) {
      setError("Invalid OTP. Please try again.");
      return;
    }

    const account = findAccountByEmail(email);
    if (!account) {
      setError("Account not found. Please sign in again.");
      setOtpStep(false);
      return;
    }

    setCurrentUserFromAccount(account);
    navigate("/home");
  };

  return (
    <div className="app-container flex flex-col bg-background min-h-screen px-6 py-10">
      <div className="flex items-center gap-1 mb-12">
        <img
          src="/chitpoo_logo.png"
          alt="Chit Pool Logo"
          width={80}
          height={80}
          className="w-30 h-30"
        />
        <span className="text-xl font-bold text-foreground">
          Chit <span className="text-primary">Pool</span>
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back!</h1>
        <p className="text-muted-foreground text-sm">
          {otpStep ? "Verify OTP to sign in" : "Sign in with your Chitkara email"}
        </p>
      </div>

      <form onSubmit={otpStep ? handleVerifyOtp : handleLogin} className="flex flex-col gap-4 flex-1">
        {!otpStep && (
          <>
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                required
              />
            </div>
          </>
        )}

        {otpStep && (
          <>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(sanitizePhone(e.target.value).slice(0, 6))}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                required
              />
            </div>

            <p className="text-xs text-muted-foreground px-1">
              OTP sent to {email}. Demo OTP: <span className="font-semibold text-foreground">{generatedOtp}</span>
            </p>

            <button
              type="button"
              onClick={() => {
                const nextOtp = String(Math.floor(100000 + Math.random() * 900000));
                setGeneratedOtp(nextOtp);
              }}
              className="text-left text-xs text-primary font-semibold px-1"
            >
              Resend OTP
            </button>
          </>
        )}

        {error && (
          <p className="text-destructive text-xs font-medium px-1">{error}</p>
        )}

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mt-4 transition-colors"
        >
          {otpStep ? "Verify OTP" : "Send OTP"} <ArrowRight className="w-4 h-4" />
        </button>

        {!otpStep && (
          <p className="text-center text-muted-foreground text-xs mt-2">
            Don't have an account?{" "}
            <button type="button" onClick={() => navigate("/signup")} className="text-primary font-semibold">
              Sign Up
            </button>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
