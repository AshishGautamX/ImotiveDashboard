"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BarChart2, BookOpen, Home, PanelLeftClose, PanelRightClose, Settings, type LucideIcon } from "lucide-react";
import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "insights", label: "Insights", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("home");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <aside
        className={[
          "hidden min-h-screen border-r border-white/[0.05] bg-[#030108]/60 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:flex md:w-20 md:flex-col md:p-4 z-50",
          isCollapsed ? "lg:w-20 lg:p-4" : "lg:w-72 lg:p-6",
        ].join(" ")}
      >
        <header className={`flex ${isCollapsed ? "flex-col items-center gap-6" : "items-center justify-between"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Image
                src="/logo.png"
                alt="Imotive Logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "hidden opacity-0 translate-x-4" : "hidden lg:block opacity-100 translate-x-0"
                }`}
            >
              <p className="font-heading text-base font-medium text-white">Ashish Gautam</p>
              <p className="text-xs text-accent">Pro Member</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden shrink-0 cursor-pointer rounded-lg border border-white/5 bg-white/5 p-2 text-text-muted transition-all hover:bg-white/10 hover:text-white lg:inline-flex"
          >
            {isCollapsed ? <PanelRightClose className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </header>

        <nav aria-label="Primary" className={`mt-10 ${isCollapsed ? "w-full" : ""}`}>
          <ul className="space-y-3">
            {navItems.map(({ id, label, icon: Icon }) => {
              const isActive = activeItem === id;

              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setActiveItem(id)}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "text-white"
                        : "text-text-muted hover:text-white",
                      isCollapsed ? "justify-center" : "justify-center lg:justify-start",
                    ].join(" ")}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-highlight"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/20 to-transparent border-l-2 border-accent"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    ) : null}
                    <Icon className={`relative z-10 h-5 w-5 shrink-0 transition-colors ${isActive ? 'text-accent' : 'text-text-muted group-hover:text-white'}`} />
                    <span
                      className={`relative z-10 whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? "hidden opacity-0" : "hidden lg:inline opacity-100"
                        }`}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <nav
        aria-label="Mobile primary"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-accent/20 bg-bg-card/95 px-2 py-2 backdrop-blur md:hidden"
      >
        <ul className="grid grid-cols-4 gap-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeItem === id;

            return (
              <li key={`mobile-${id}`}>
                <button
                  type="button"
                  onClick={() => setActiveItem(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-[11px]",
                    isActive ? "bg-accent/20 text-text-primary" : "text-text-muted",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4 text-accent/80" />
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
