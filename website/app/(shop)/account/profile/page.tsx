"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-10 max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-ink mb-6">
          Profile
        </h1>

        <div className="bg-white rounded-2xl border shadow-card p-6 space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" className="rounded-xl mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="rounded-xl mt-1" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" className="rounded-xl mt-1" />
          </div>

          <Button className="bg-coral-500 hover:bg-coral-600 text-white rounded-xl">
            Save changes
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
