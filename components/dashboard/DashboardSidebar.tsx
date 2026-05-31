import { BarChart2, BookOpen, Home, PanelLeftClose, Settings, type LucideIcon } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
};

const navItems: NavItem[] = [
  { label: "Home", href: "#", icon: Home, isActive: true },
  { label: "Courses", href: "#", icon: BookOpen },
  { label: "Insights", href: "#", icon: BarChart2 },
  { label: "Settings", href: "#", icon: Settings },
];

export function DashboardSidebar() {
  return (
    <>
      <aside className="hidden min-h-screen border-r border-accent/20 bg-bg-card md:flex md:w-20 md:flex-col md:p-4 lg:w-72 lg:p-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-bg-base font-heading text-sm text-text-primary">
              AG
            </p>
            <div className="hidden lg:block">
              <p className="font-heading text-base text-text-primary">Ashish</p>
              <p className="text-xs text-text-muted">Learning Mode</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Collapse sidebar"
            className="hidden rounded-lg border border-accent/20 bg-bg-base p-2 text-text-muted transition-colors hover:text-text-primary lg:inline-flex"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </header>

        <nav aria-label="Primary" className="mt-8">
          <ul className="space-y-2">
            {navItems.map(({ label, href, icon: Icon, isActive }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-accent/20 text-text-primary"
                      : "text-text-muted hover:bg-bg-base hover:text-text-primary",
                    "justify-center lg:justify-start",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5 shrink-0 text-accent/80" />
                  <span className="hidden lg:inline">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <nav
        aria-label="Mobile primary"
        className="fixed inset-x-0 bottom-0 z-20 border-t border-accent/20 bg-bg-card/95 px-2 py-2 backdrop-blur md:hidden"
      >
        <ul className="grid grid-cols-4 gap-1">
          {navItems.map(({ label, href, icon: Icon, isActive }) => (
            <li key={`mobile-${label}`}>
              <a
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex flex-col items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-[11px]",
                  isActive ? "bg-accent/20 text-text-primary" : "text-text-muted",
                ].join(" ")}
              >
                <Icon className="h-4 w-4 text-accent/80" />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
