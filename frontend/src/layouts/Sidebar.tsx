import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Users,
  Store,
  CreditCard,
  BarChart3,
  Settings as SettingsIcon,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Products", icon: Package },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/sellers", label: "Sellers", icon: Store },
  { to: "/payments", label: "Payments", icon: CreditCard },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <div className="flex flex-col h-full bg-brand-700 text-white">
      <div className="flex items-center gap-2 px-6 h-16 border-b border-white/10 shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-coral-500 text-white font-bold text-sm">
          M
        </div>
        <span className="text-lg font-bold tracking-tight">Marketly</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? "bg-coral-500 text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3 px-5 py-4 border-t border-white/10 shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
          A
        </div>
        <div>
          <p className="text-sm font-medium">Admin</p>
          <p className="text-xs text-white/50">Super Admin</p>
        </div>
      </div>
    </div>
  );
}
