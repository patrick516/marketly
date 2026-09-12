"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border shadow-card p-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-brand-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        <h1 className="text-xl font-bold text-ink mb-1">Forgot password</h1>
        <p className="text-sm text-ink-muted mb-6">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="rounded-xl mt-1" />
          </div>

          <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white rounded-xl h-11 font-semibold">
            Send reset link
          </Button>
        </div>
      </div>
    </div>
  );
}
