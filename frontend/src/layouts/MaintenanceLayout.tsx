// src/layouts/MaintenanceLayout.tsx
import type { ReactNode } from "react";

interface MaintenanceLayoutProps {
  children: ReactNode;
}

export default function MaintenanceLayout({
  children,
}: MaintenanceLayoutProps) {
  return <div className="min-h-screen bg-gray-950">{children}</div>;
}
