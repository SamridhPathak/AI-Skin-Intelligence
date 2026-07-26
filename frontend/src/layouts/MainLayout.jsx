import { useState } from "react";
import { NavLink } from "react-router-dom";
import { TbLogout, TbMenu2, TbX } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

/**
 * Shared shell for every authenticated page. On screens >= sm, a fixed
 * sidebar. Below that, a compact top bar with a toggle that reveals the
 * same nav as a dropdown — the sidebar layout doesn't survive on mobile
 * widths, so this collapses rather than squeezing.
 */
export default function MainLayout({ navItems = [], brandLabel = "Skin AI", children }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavList = ({ onNavigate }) => (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive }) => `nav-item ${isActive ? "nav-item-active" : ""}`}
        >
          <span className="text-base" aria-hidden="true">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen p-4 sm:p-6">
      {/* Mobile top bar */}
      <div className="sm:hidden glass flex items-center justify-between p-3 mb-4">
        <span className="font-display text-sm font-semibold text-ocean-700">{brandLabel}</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" className="text-ink-primary text-xl">
          {mobileOpen ? <TbX /> : <TbMenu2 />}
        </button>
      </div>
      {mobileOpen && (
        <div className="sm:hidden glass p-4 mb-4">
          <NavList onNavigate={() => setMobileOpen(false)} />
          <div className="border-t border-white/60 mt-3 pt-3">
            <p className="text-xs text-ink-secondary truncate mb-2">{user?.sub}</p>
            <button onClick={logout} className="nav-item w-full text-danger-500 hover:bg-danger-50">
              <TbLogout className="text-base" /> Log out
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-5 max-w-[1200px] mx-auto">
        {/* Desktop sidebar */}
        <aside className="hidden sm:block w-48 glass p-4 h-fit sticky top-6">
          <div className="font-display text-sm font-semibold text-ocean-700 mb-5">{brandLabel}</div>
          <NavList />
          <div className="border-t border-white/60 mt-4 pt-3">
            <p className="text-xs text-ink-secondary truncate mb-2">{user?.sub}</p>
            <button onClick={logout} className="nav-item w-full text-danger-500 hover:bg-danger-50">
              <TbLogout className="text-base" aria-hidden="true" /> Log out
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col gap-5 min-w-0">{children}</main>
      </div>
    </div>
  );
}
