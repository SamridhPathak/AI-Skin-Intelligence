import { useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import SkinHealthRing from "../../components/SkinHealthRing";
import { CONSULTANT_NAV_ITEMS } from "./consultant/consultantNav";
import { MOCK_CLIENTS, STATUS_OPTIONS } from "../../data/mockConsultantData";

const STATUS_STYLE = {
  active: "pill-active",
  pending: "pill-pending",
  flagged: "pill-flagged",
};

export default function ConsultantDashboard() {
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const filtered = useMemo(() => {
    const clients = statusFilter === "All statuses"
      ? MOCK_CLIENTS
      : MOCK_CLIENTS.filter((c) => c.status === statusFilter);
    return clients.slice(0, 5);
  }, [statusFilter]);

  const metrics = [
    { label: "Total clients", value: MOCK_CLIENTS.length },
    { label: "Active", value: MOCK_CLIENTS.filter((c) => c.status === "active").length },
    { label: "Pending review", value: MOCK_CLIENTS.filter((c) => c.status === "pending").length },
    { label: "Flagged", value: MOCK_CLIENTS.filter((c) => c.status === "flagged").length, tone: "text-clay-600" },
  ];

  return (
    <MainLayout navItems={CONSULTANT_NAV_ITEMS} brandLabel="Skin AI · Consultant">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Client overview</h1>
          <p className="text-sm text-ink-secondary">Your assigned clients at a glance</p>
        </div>
        <SkinHealthRing value={78} tone="ocean" size={64} label="Client satisfaction" />
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
          <h2 className="text-base font-semibold">Recent clients</h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="field w-auto py-1.5 text-sm"
          >
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="text-left text-ink-secondary border-b border-ink-primary/10">
              <th className="pb-2 font-medium" style={{ width: "35%" }}>Client</th>
              <th className="pb-2 font-medium" style={{ width: "25%" }}>Skin type</th>
              <th className="pb-2 font-medium" style={{ width: "25%" }}>Assigned</th>
              <th className="pb-2 font-medium" style={{ width: "15%" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-ink-primary/5 last:border-0">
                <td className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="avatar bg-ocean-100 text-ocean-600">{c.initials}</div>
                    <span className="text-ink-primary">{c.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-ink-secondary">{c.skin_type}</td>
                <td className="py-2.5 text-ink-secondary font-mono text-xs">{c.assignedDate}</td>
                <td className="py-2.5">
                  <span className={`pill ${STATUS_STYLE[c.status]}`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
