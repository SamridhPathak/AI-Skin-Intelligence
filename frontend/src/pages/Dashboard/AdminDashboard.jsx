import React, { useMemo, useState } from "react";
import {
  TbLayoutDashboard,
  TbUsers,
  TbChartBar,
  TbShieldCheck,
  TbFileReport,
} from "react-icons/tb";
import MainLayout from "../../layouts/MainLayout";
import SkinHealthRing from "../../components/SkinHealthRing";

// Mock data — swap for GET /admin/users and GET /admin/platform-stats later
const MOCK_USERS = [
  { id: 1, name: "Riya Sharma", initials: "RS", role: "user", status: "active", joined: "2026-06-02" },
  { id: 2, name: "Arjun Kapoor", initials: "AK", role: "consultant", status: "pending", joined: "2026-06-11" },
  { id: 3, name: "Nisha Mehta", initials: "NM", role: "dermatologist", status: "active", joined: "2026-05-28" },
  { id: 4, name: "Devraj Singh", initials: "DS", role: "user", status: "flagged", joined: "2026-06-14" },
  { id: 5, name: "Priya Nair", initials: "PN", role: "user", status: "active", joined: "2026-06-16" },
];

const ROLE_OPTIONS = ["All roles", "user", "consultant", "dermatologist", "admin"];
const STATUS_STYLE = {
  active: "pill-active",
  pending: "pill-pending",
  flagged: "pill-flagged",
};

const NAV_ITEMS = [
  { label: "Overview", icon: <TbLayoutDashboard />, to: "/admin" },
  { label: "Users", icon: <TbUsers />, to: "/admin/users" },
  { label: "Analytics", icon: <TbChartBar />, to: "/admin/analytics" },
  { label: "Recommendations", icon: <TbShieldCheck />, to: "/admin/recommendations" },
  { label: "Reports", icon: <TbFileReport />, to: "/admin/reports" },
];

export default function AdminDashboard() {
  const [roleFilter, setRoleFilter] = useState("All roles");

  const filteredUsers = useMemo(() => {
    if (roleFilter === "All roles") return MOCK_USERS;
    return MOCK_USERS.filter((u) => u.role === roleFilter);
  }, [roleFilter]);

  const metrics = [
    { label: "Total users", value: "2,481" },
    { label: "Active today", value: "312" },
    { label: "Consultants", value: "14" },
    { label: "Open flags", value: "3", tone: "text-clay-600" },
  ];

  return (
    <MainLayout navItems={NAV_ITEMS} brandLabel="Skin AI · Admin">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Platform overview</h1>
          <p className="text-sm text-ink-secondary">Monitor users, roles, and system health</p>
        </div>
        <SkinHealthRing value={92} tone="sage" size={64} label="Platform health" />
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="glass metric-card">
            <span className="metric-label">{m.label}</span>
            <span className={`metric-value ${m.tone || ""}`}>{m.value}</span>
          </div>
        ))}
      </div>

      <div className="glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">User management</h2>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="field w-auto py-1.5 text-sm"
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="text-left text-ink-secondary border-b border-ink-primary/10">
              <th className="pb-2 font-medium" style={{ width: "40%" }}>User</th>
              <th className="pb-2 font-medium" style={{ width: "20%" }}>Role</th>
              <th className="pb-2 font-medium" style={{ width: "20%" }}>Joined</th>
              <th className="pb-2 font-medium" style={{ width: "20%" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-b border-ink-primary/5 last:border-0">
                <td className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="avatar bg-ocean-100 text-ocean-600">{u.initials}</div>
                    <span className="text-ink-primary">{u.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-ink-secondary capitalize">{u.role}</td>
                <td className="py-2.5 text-ink-secondary font-mono text-xs">{u.joined}</td>
                <td className="py-2.5">
                  <span className={`pill ${STATUS_STYLE[u.status]}`}>{u.status}</span>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-ink-secondary">
                  No users match this role.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
