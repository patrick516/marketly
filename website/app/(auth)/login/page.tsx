"use client";

const ADMIN_URL = "http://localhost:5173"; // TODO: replace with deployed admin panel URL

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm bg-white rounded-xl border shadow-card p-6 text-center">
        <h1 className="text-xl font-bold text-ink mb-2">Vendor Login</h1>
        <p className="text-sm text-ink-muted mb-6">
          Login is handled by the admin panel. You&apos;ll be redirected there.
        </p>
        <a
          href={ADMIN_URL}
          className="inline-flex w-full items-center justify-center rounded-xl bg-coral-500 hover:bg-coral-600 text-white h-12 font-semibold transition"
        >
          Go to Admin Panel
        </a>
      </div>
    </div>
  );
}
