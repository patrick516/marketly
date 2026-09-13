import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Incorrect username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border shadow-card p-8">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-coral-500 text-white font-bold">
            M
          </div>
          <span className="text-lg font-bold text-ink">Marketly Admin</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              className="rounded-xl mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="rounded-xl mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm text-coral-600 text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-coral-500 hover:bg-coral-600 text-white rounded-xl h-11 font-semibold"
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
