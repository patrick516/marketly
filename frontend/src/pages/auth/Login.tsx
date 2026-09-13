import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Incorrect username or password");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4 py-12">
      {/* Logo + brand */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-coral-500 text-white font-bold text-lg">
          M
        </div>
        <span className="text-xl font-bold text-ink">Marketly Admin</span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-ink text-center">Welcome back</h1>
      <p className="mt-2 text-sm text-ink/50 text-center">
        Sign in to your admin account to continue.
      </p>

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl border shadow-card p-8 mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              className="rounded-xl mt-1.5 h-11 border-ink/10 focus-visible:ring-coral-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              autoComplete="username"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1.5">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="rounded-xl h-11 border-ink/10 focus-visible:ring-coral-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-ink/40 hover:text-ink/70 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-coral-600 bg-coral-50 border border-coral-100 rounded-xl px-3 py-2 text-center">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-coral-500 hover:bg-coral-600 text-white rounded-xl h-11 font-semibold"
          >
            Log in
          </Button>
        </form>
      </div>

      {/* Footer */}
      <div className="w-full max-w-sm mt-8">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-ink/10" />
          {/* <p className="text-xs text-ink/40">
            Contact{" "}
            <a
              href="mailto:support@marketly.com"
              className="text-coral-600 hover:text-coral-700 font-medium"
            >
              support
            </a>{" "}
            if you need help
          </p> */}
          <div className="h-px flex-1 bg-ink/10" />
        </div>
        <p className="mt-4 text-center text-xs text-ink/30">
          © 2026 Marketly. All rights reserved.
        </p>
      </div>
    </div>
  );
}
