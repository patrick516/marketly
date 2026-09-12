import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export default function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface p-1.5 md:p-2">
      <div className="flex gap-1.5 md:gap-2 h-[calc(100vh-0.75rem)] md:h-[calc(100vh-1rem)]">
        {/* Desktop sidebar */}
        <aside className="hidden md:block md:w-64 shrink-0 rounded-3xl overflow-hidden">
          <Sidebar />
        </aside>

        {/* Mobile sidebar */}
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent side="left" className="p-0 w-64 border-0">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <Sidebar onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden rounded-3xl bg-white shadow-card">
          <Topbar onMenuClick={() => setMobileNavOpen(true)} />
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
