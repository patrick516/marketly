import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import logo from "../../assets/logo.jpeg";
import ForgotPasswordModal from "./Forgotpasswordmodal";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0b1e3d 0%, #0f2856 50%, #0a1f45 100%)",
        }}
      >
        {/* Background decorative blobs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #1d4ed8 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative w-full max-w-sm">
          {/* Brand */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div
                className="w-20 h-20 rounded-full overflow-hidden border-4"
                style={{ borderColor: "rgba(59,130,246,0.5)" }}
              >
                <img
                  src={logo}
                  alt="Cinematic Systems"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1
              className="text-xl font-bold tracking-wider"
              style={{ color: "#fff" }}
            >
              CINEMATIC <span style={{ color: "#3b82f6" }}>SYSTEMS</span>
            </h1>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Neat, Reliable, Reasonable &amp; Professional
            </p>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "#fff",
              boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            }}
          >
            <div className="text-center mb-7">
              <h2 className="text-xl font-bold" style={{ color: "#111827" }}>
                Welcome Back
              </h2>
              <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                Sign in to your admin account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <div
                  className="flex items-center rounded-lg border overflow-hidden transition-all focus-within:ring-2"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <span
                    className="pl-3 pr-2 flex-shrink-0"
                    style={{ color: "#9ca3af" }}
                  >
                    <Mail size={17} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 py-2.5 pr-3 text-sm outline-none bg-transparent"
                    style={{ color: "#111827" }}
                    placeholder="admin@cinematicsystems.co.za"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div
                  className="flex items-center rounded-lg border overflow-hidden transition-all focus-within:ring-2"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <span
                    className="pl-3 pr-2 flex-shrink-0"
                    style={{ color: "#9ca3af" }}
                  >
                    <Lock size={17} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 py-2.5 text-sm outline-none bg-transparent"
                    style={{ color: "#111827" }}
                    placeholder="••••••••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pr-3 pl-2 flex-shrink-0 transition-colors"
                    style={{ color: "#9ca3af" }}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border"
                    style={{ accentColor: "#2563eb" }}
                  />
                  <span className="text-sm" style={{ color: "#374151" }}>
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-sm font-medium hover:underline transition-colors"
                  style={{ color: "#2563eb" }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 mt-1"
                style={{
                  background: loading
                    ? "#93c5fd"
                    : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
                }}
              >
                {loading ? "Signing in..." : "Log In"}
              </button>
            </form>

            <div
              className="mt-6 pt-5 border-t text-center"
              style={{ borderColor: "#f3f4f6" }}
            >
              <p className="text-xs" style={{ color: "#9ca3af" }}>
                © {new Date().getFullYear()} Cinematic Systems. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal — overlays everything when triggered */}
      {showForgot && (
        <ForgotPasswordModal onClose={() => setShowForgot(false)} />
      )}
    </>
  );
};

export default Login;
