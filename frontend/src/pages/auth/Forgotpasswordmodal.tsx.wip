import React, { useState, useRef, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
  X,
} from "lucide-react";
import api from "../../lib/api";
import toast from "react-hot-toast";

// ── Types ──────────────────────────────────────────────────────────────────────
type ForgotStep = "email" | "otp" | "reset" | "success";

// ── Utility: mask email for display ───────────────────────────────────────────
const maskEmail = (email: string) => {
  const [local, domain] = email.split("@");
  const visible = local.slice(0, 2);
  const masked = "*".repeat(Math.max(local.length - 2, 3));
  return `${visible}${masked}@${domain}`;
};

// ── Props ──────────────────────────────────────────────────────────────────────
interface ForgotPasswordModalProps {
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  onClose,
}) => {
  const [step, setStep] = useState<ForgotStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── Resend countdown timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  // ── Step 1: Send OTP ───────────────────────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email!");
      setStep("otp");
      setResendCountdown(60);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: OTP digit input handlers ──────────────────────────────────────
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      // Handle paste — distribute across fields
      const digits = value.slice(0, 6).split("");
      digits.forEach((d, i) => {
        if (index + i < 6) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      otpRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 6) {
      toast.error("Please enter all 6 digits");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/auth/verify-otp", {
        email,
        otp: otpString,
      });
      setResetToken(data.resetToken);
      toast.success("OTP verified!");
      setStep("reset");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("New OTP sent!");
      setOtp(["", "", "", "", "", ""]);
      setResendCountdown(60);
      otpRefs.current[0]?.focus();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 3: Reset Password ─────────────────────────────────────────────────
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        resetToken,
        newPassword,
        confirmPassword,
      });
      setStep("success");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  // ── Shared styles ──────────────────────────────────────────────────────────
  const inputWrap =
    "flex items-center rounded-lg border overflow-hidden transition-all focus-within:ring-2";

  const primaryBtn = (disabled = false) => ({
    background: disabled
      ? "#93c5fd"
      : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-8"
        style={{
          background: "#fff",
          boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
          animation: "slideUp 0.25s ease",
        }}
      >
        {/* Close button — hidden on success (use the CTA instead) */}
        {step !== "success" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "#9ca3af" }}
          >
            <X size={18} />
          </button>
        )}

        {/* ── STEP: EMAIL ───────────────────────────────────────────────── */}
        {step === "email" && (
          <div>
            <div className="mb-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "#eff6ff" }}
              >
                <Mail size={20} style={{ color: "#2563eb" }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#111827" }}>
                Forgot Password?
              </h3>
              <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                Enter your registered email and we'll send you a 6-digit OTP.
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label
                  className="block text-xs font-medium mb-1.5"
                  style={{ color: "#374151" }}
                >
                  Email Address
                </label>
                <div className={inputWrap} style={{ borderColor: "#e5e7eb" }}>
                  <span className="pl-3 pr-2" style={{ color: "#9ca3af" }}>
                    <Mail size={17} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 py-2.5 pr-3 text-sm outline-none bg-transparent"
                    style={{ color: "#111827" }}
                    placeholder="your@email.com"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style={primaryBtn(loading)}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP: OTP ─────────────────────────────────────────────────── */}
        {step === "otp" && (
          <div>
            <button
              onClick={() => setStep("email")}
              className="flex items-center gap-1.5 text-sm mb-5 hover:opacity-70 transition-opacity"
              style={{ color: "#6b7280" }}
            >
              <ArrowLeft size={15} /> Back
            </button>

            <div className="mb-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "#eff6ff" }}
              >
                <Mail size={20} style={{ color: "#2563eb" }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#111827" }}>
                Enter OTP
              </h3>
              <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                We sent a 6-digit code to{" "}
                <span className="font-medium" style={{ color: "#111827" }}>
                  {maskEmail(email)}
                </span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="flex gap-2 justify-between">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-12 text-center text-lg font-bold rounded-lg border-2 outline-none transition-all focus:border-blue-500"
                    style={{
                      borderColor: digit ? "#2563eb" : "#e5e7eb",
                      color: "#111827",
                      background: digit ? "#eff6ff" : "#fff",
                    }}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading || otp.join("").length < 6}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                style={primaryBtn(loading || otp.join("").length < 6)}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <p className="text-center text-sm" style={{ color: "#6b7280" }}>
                Didn't receive it?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCountdown > 0 || loading}
                  className="font-medium transition-colors inline-flex items-center gap-1"
                  style={{
                    color: resendCountdown > 0 ? "#9ca3af" : "#2563eb",
                    cursor: resendCountdown > 0 ? "not-allowed" : "pointer",
                  }}
                >
                  {resendCountdown > 0 ? (
                    `Resend in ${resendCountdown}s`
                  ) : (
                    <>
                      <RefreshCw size={13} /> Resend OTP
                    </>
                  )}
                </button>
              </p>
            </form>
          </div>
        )}

        {/* ── STEP: RESET PASSWORD ──────────────────────────────────────── */}
        {step === "reset" && (
          <div>
            <div className="mb-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "#eff6ff" }}
              >
                <Lock size={20} style={{ color: "#2563eb" }} />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#111827" }}>
                New Password
              </h3>
              <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                Choose a strong password for your account.
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label
                  className="block text-xs font-medium mb-1.5"
                  style={{ color: "#374151" }}
                >
                  New Password
                </label>
                <div className={inputWrap} style={{ borderColor: "#e5e7eb" }}>
                  <span className="pl-3 pr-2" style={{ color: "#9ca3af" }}>
                    <Lock size={17} />
                  </span>
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex-1 py-2.5 text-sm outline-none bg-transparent"
                    style={{ color: "#111827" }}
                    placeholder="Min 6 characters"
                    required
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="pr-3 pl-2"
                    style={{ color: "#9ca3af" }}
                  >
                    {showNew ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div>
                <label
                  className="block text-xs font-medium mb-1.5"
                  style={{ color: "#374151" }}
                >
                  Confirm Password
                </label>
                <div
                  className={inputWrap}
                  style={{
                    borderColor:
                      confirmPassword && confirmPassword !== newPassword
                        ? "#ef4444"
                        : "#e5e7eb",
                  }}
                >
                  <span className="pl-3 pr-2" style={{ color: "#9ca3af" }}>
                    <Lock size={17} />
                  </span>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex-1 py-2.5 text-sm outline-none bg-transparent"
                    style={{ color: "#111827" }}
                    placeholder="Repeat password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="pr-3 pl-2"
                    style={{ color: "#9ca3af" }}
                  >
                    {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 mt-1"
                style={primaryBtn(loading)}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        )}

        {/* ── STEP: SUCCESS ─────────────────────────────────────────────── */}
        {step === "success" && (
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <CheckCircle
                size={52}
                style={{ color: "#16a34a" }}
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: "#111827" }}>
              Password Reset!
            </h3>
            <p className="text-sm mb-6" style={{ color: "#6b7280" }}>
              Your password has been updated successfully. You can now sign in
              with your new password.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={primaryBtn()}
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordModal;
