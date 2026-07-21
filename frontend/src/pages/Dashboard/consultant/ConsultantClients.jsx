import { useMemo, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import { CONSULTANT_NAV_ITEMS } from "./consultantNav";
import { MOCK_CLIENTS, STATUS_OPTIONS } from "../../../data/mockConsultantData";

const STATUS_STYLE = {
  active: "pill-active",
  pending: "pill-pending",
  flagged: "pill-flagged",
};

export default function ConsultantClients() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");

  const filtered = useMemo(() => {
    return MOCK_CLIENTS.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All statuses" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <MainLayout navItems={CONSULTANT_NAV_ITEMS} brandLabel="Skin AI · Consultant">
      <header>
        <h1 className="text-xl font-semibold">Clients</h1>
        <p className="text-sm text-ink-secondary">{filtered.length} of {MOCK_CLIENTS.length} clients</p>
      </header>

      <div className="glass p-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field flex-1"
          />
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="field sm:w-44">
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="text-left text-ink-secondary border-b border-ink-primary/10">
              <th className="pb-2 font-medium" style={{ width: "25%" }}>Client</th>
              <th className="pb-2 font-medium" style={{ width: "10%" }}>Age</th>
              <th className="pb-2 font-medium" style={{ width: "20%" }}>Skin type</th>
              <th className="pb-2 font-medium" style={{ width: "25%" }}>Goals</th>
              <th className="pb-2 font-medium" style={{ width: "20%" }}>Status</th>
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
                <td className="py-2.5 text-ink-secondary">{c.age}</td>
                <td className="py-2.5 text-ink-secondary">{c.skin_type}</td>
                <td className="py-2.5 text-ink-secondary truncate">{c.goals}</td>
                <td className="py-2.5">
                  <span className={`pill ${STATUS_STYLE[c.status]}`}>{c.status}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-ink-secondary">No clients match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
