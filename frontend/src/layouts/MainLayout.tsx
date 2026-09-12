// import React, { useEffect, useState } from "react";
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   Wrench,
//   MessageSquare,
//   LogOut,
//   Menu,
//   X,
//   Bell,
//   ChevronDown,
//   BarChart2,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// import api from "../lib/api";

// const MainLayout: React.FC = () => {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const fetchUnreadCount = async () => {
//     try {
//       const { data } = await api.get("/messages/unread-count");
//       setUnreadCount(data.count);
//     } catch (error) {
//       console.error("Error fetching unread count:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUnreadCount();
//     const interval = setInterval(fetchUnreadCount, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const navItems = [
//     { path: "/", label: "Dashboard", icon: LayoutDashboard },
//     { path: "/products", label: "Products", icon: Package },
//     { path: "/services", label: "Services", icon: Wrench },
//     {
//       path: "/messages",
//       label: "Messages",
//       icon: MessageSquare,
//       badge: unreadCount > 0 ? unreadCount : null,
//     },
//     {
//       path: "/analytics",
//       label: "Analytics",
//       icon: BarChart2,
//     },
//   ];

//   return (
//     <div className="min-h-screen flex" style={{ background: "#f0f4f8" }}>
//       {/* Mobile toggle */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md"
//         style={{ background: "#0f2447", color: "#fff" }}
//       >
//         {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed top-0 left-0 z-40 h-screen w-60 flex flex-col transform transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
//         `}
//         style={{
//           background:
//             "linear-gradient(180deg, #0b1e3d 0%, #0f2856 60%, #0a1f45 100%)",
//         }}
//       >
//         {/* Logo */}
//         <div
//           className="flex items-center gap-3 px-5 py-5 border-b"
//           style={{ borderColor: "rgba(255,255,255,0.08)" }}
//         >
//           <div
//             className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2"
//             style={{ borderColor: "#3b82f6" }}
//           >
//             <img
//               src="/images/logo.jpeg"
//               alt="logo"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <div
//               className="text-sm font-bold leading-tight"
//               style={{ color: "#fff" }}
//             >
//               CINEMATIC <span style={{ color: "#3b82f6" }}>SYSTEMS</span>
//             </div>
//             <div
//               className="text-xs"
//               style={{ color: "rgba(255,255,255,0.45)", fontSize: "9px" }}
//             >
//               Neat, Reliable, Reasonable & Professional
//             </div>
//           </div>
//           <button
//             className="ml-auto opacity-40 hover:opacity-70"
//             style={{ color: "#fff" }}
//           >
//             <ChevronDown size={14} />
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               end={item.path === "/"}
//               onClick={() => setSidebarOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
//                   isActive ? "text-white" : "hover:bg-white/10"
//                 }`
//               }
//               style={({ isActive }) =>
//                 isActive
//                   ? { background: "#2563eb", color: "#fff" }
//                   : { color: "rgba(255,255,255,0.65)" }
//               }
//             >
//               <item.icon size={18} />
//               <span className="flex-1">{item.label}</span>
//               {item.badge && (
//                 <span
//                   className="text-white text-xs px-1.5 py-0.5 rounded-full font-bold"
//                   style={{
//                     background: "#ef4444",
//                     minWidth: "18px",
//                     textAlign: "center",
//                   }}
//                 >
//                   {item.badge}
//                 </span>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div
//           className="px-3 pb-4 border-t pt-3"
//           style={{ borderColor: "rgba(255,255,255,0.08)" }}
//         >
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
//             style={{ color: "rgba(255,255,255,0.65)" }}
//           >
//             <LogOut size={18} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
//         {/* Top bar */}
//         <header
//           className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 border-b"
//           style={{ background: "#fff", borderColor: "#e5e7eb" }}
//         >
//           <div />
//           <div className="flex items-center gap-4">
//             {/* Bell */}
//             <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
//               <Bell size={20} style={{ color: "#374151" }} />
//               {unreadCount > 0 && (
//                 <span
//                   className="absolute top-1 right-1 w-4 h-4 text-white text-xs rounded-full flex items-center justify-center font-bold"
//                   style={{ background: "#ef4444", fontSize: "9px" }}
//                 >
//                   {unreadCount}
//                 </span>
//               )}
//             </button>

//             {/* User */}
//             <div className="flex items-center gap-2">
//               <div
//                 className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
//                 style={{ background: "#6b7280" }}
//               >
//                 {user?.name?.charAt(0) || "A"}
//               </div>
//               <div className="hidden sm:block text-right">
//                 <p
//                   className="text-sm font-semibold leading-none"
//                   style={{ color: "#111827" }}
//                 >
//                   {user?.name || "Admin User"}
//                 </p>
//                 <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
//                   Administrator
//                 </p>
//               </div>
//               <ChevronDown size={14} style={{ color: "#9ca3af" }} />
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="flex-1 p-6 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
