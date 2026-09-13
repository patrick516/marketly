import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Plus,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/auth";

// TODO: replace with real user data once a real backend exists
const currentUser = {
  name: "Admin",
  email: "admin@marketly.com",
};
interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast.success("Logged out");
    navigate("/login");
  }
  return (
    <div className="flex items-center gap-3 h-16 px-4 md:px-6 border-b shrink-0">
      <button
        onClick={onMenuClick}
        className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-muted transition"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, orders, customers..."
          className="pl-10 bg-surface-muted border-0 rounded-full focus-visible:ring-brand-700"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          size="sm"
          className="hidden sm:flex bg-coral-500 hover:bg-coral-600 text-white rounded-xl gap-1.5"
          onClick={() => navigate("/products")}
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-muted hover:bg-surface-muted transition">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-coral-500" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-surface-muted transition">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-white text-sm font-semibold">
                {currentUser.name.charAt(0)}
              </div>
              <span className="hidden sm:block text-sm font-medium text-ink">
                {currentUser.name}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium text-ink">{currentUser.name}</span>
                <span className="text-xs text-ink-muted font-normal">
                  {currentUser.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <UserIcon className="mr-2 h-4 w-4" />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-coral-600 focus:text-coral-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
