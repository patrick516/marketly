"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border shadow-card p-6">
        <h1 className="text-xl font-bold text-ink mb-1">Create an account</h1>
        <p className="text-sm text-ink-muted mb-6">
          Join Marketly to start shopping.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" className="rounded-xl mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="rounded-xl mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="rounded-xl mt-1" />
          </div>

          <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white rounded-xl h-11 font-semibold">
            Create account
          </Button>
        </div>

        <p className="text-sm text-ink-muted text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-brand-700 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
