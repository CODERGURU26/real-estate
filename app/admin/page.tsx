"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiLogOut, FiHome, FiUsers, FiMonitor } from "react-icons/fi";

import Dashboard from "../components/admin/Dashboard";
import Users from "../components/admin/User";
import HomepageManager from "../components/admin/HomepageManager";

type Tab = "dashboard" | "users" | "homepage";

const tabConfig = {
  dashboard: { label: "Dashboard", icon: FiHome },
  users: { label: "Users", icon: FiUsers },
  homepage: { label: "Homepage", icon: FiMonitor }
} as const;

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user?.role !== "admin") {
      router.replace("/login");
    }
  }, [session, status, router]);

  // Close sidebar when window resizes to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-800 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user?.role !== "admin") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-rose-700 to-rose-600 text-white flex flex-col transform transition-transform duration-300 ease-in-out z-40 shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:h-screen md:shadow-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-blue-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-bold">Admin Panel</h1>
          </div>
          <button
            className="md:hidden text-white hover:bg-rose-700 p-2 rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 lg:p-6 border-b border-blue-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {session.user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{session.user?.name}</p>
              <p className="text-xs text-blue-200 truncate">{session.user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 lg:p-6 space-y-2">
          {(Object.keys(tabConfig) as Tab[]).map((tab) => {
            const config = tabConfig[tab];
            const Icon = config.icon;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-rose-600 font-semibold shadow-lg transform scale-105"
                    : "hover:bg-rose-700/50 hover:translate-x-1"
                }`}
                aria-label={`Navigate to ${config.label}`}
              >
                <Icon size={20} />
                <span className="font-medium">{config.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 lg:p-6 border-t border-blue-700/50">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-600/20 hover:text-red-200 transition-colors duration-200"
            aria-label="Sign out"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 w-full min-h-screen transition-all duration-300 md:ml-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm border-b sticky top-0 z-20">
          <div className="flex items-center justify-between p-4">
            <button
              className="text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <FiMenu size={24} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 capitalize flex items-center gap-2">
              {(() => {
                const config = tabConfig[activeTab];
                const Icon = config.icon;
                return (
                  <>
                    <Icon size={20} />
                    {config.label}
                  </>
                );
              })()}
            </h2>
            <div className="w-10 h-10"></div> {/* Spacer for centering */}
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:block bg-white shadow-sm border-b">
          <div className="px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const config = tabConfig[activeTab];
                  const Icon = config.icon;
                  return (
                    <>
                      <Icon size={24} className="text-blue-800" />
                      <h1 className="text-2xl font-bold text-gray-800">{config.label}</h1>
                    </>
                  );
                })()}
              </div>
              <div className="text-sm text-gray-500">
                Welcome back, {session.user?.name}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="w-full h-full p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-none">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "users" && <Users />}
            {activeTab === "homepage" && <HomepageManager />}
          </div>
        </div>
      </main>
    </div>
  );
}