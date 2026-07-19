import { NavLink } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

/**
 * Shared shell for every authenticated page (dashboards + profile).
 * Pass role-specific nav items; the sidebar/header chrome stays identical
 * across Admin/Consultant/Dermatologist/User so the app feels like one product.
 *
 * navItems: [{ label, icon: <TbLayoutDashboard />, to: "/admin" }, ...]
 */
export default function MainLayout({ navItems = [], brandLabel = "Skin AI", children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-6">
      <div className="flex gap-5 max-w-[1200px] mx-auto">
        <aside className="w-48 glass p-4 h-fit sticky top-6">
          <div className="font-display text-sm font-semibold text-ocean-700 mb-5">
            {brandLabel}
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "nav-item-active" : ""}`
                }
              >
                <span className="text-base" aria-hidden="true">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-white/60 mt-4 pt-3">
            <p className="text-xs text-ink-secondary truncate mb-2">{user?.sub}</p>
            <button
              onClick={logout}
              className="nav-item w-full text-danger-500 hover:bg-danger-50"
            >
              <TbLogout className="text-base" aria-hidden="true" />
              Log out
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col gap-5">{children}</main>
      </div>
    </div>
  );
}
