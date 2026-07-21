import { useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import SkinHealthRing from "../../components/SkinHealthRing";
import { DERM_NAV_ITEMS } from "./dermatologist/dermNav";
import { MOCK_PATIENTS, RISK_OPTIONS, RISK_STYLE } from "../../data/mockDermatologistData";

export default function DermatologistDashboard() {
  const [riskFilter, setRiskFilter] = useState("All risk levels");

  const filtered = useMemo(() => {
    const patients = riskFilter === "All risk levels"
      ? MOCK_PATIENTS
      : MOCK_PATIENTS.filter((p) => p.risk === riskFilter);
    return patients.slice(0, 5);
  }, [riskFilter]);

  const metrics = [
    { label: "Total patients", value: MOCK_PATIENTS.length },
    { label: "Low risk", value: MOCK_PATIENTS.filter((p) => p.risk === "low").length },
    { label: "Medium risk", value: MOCK_PATIENTS.filter((p) => p.risk === "medium").length },
    { label: "High risk", value: MOCK_PATIENTS.filter((p) => p.risk === "high").length, tone: "text-danger-500" },
  ];

  return (
    <MainLayout navItems={DERM_NAV_ITEMS} brandLabel="Skin AI · Dermatologist">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Patient overview</h1>
          <p className="text-sm text-ink-secondary">Your assigned patients at a glance</p>
        </div>
        <SkinHealthRing value={85} tone="sage" size={64} label="Avg. patient outlook" />
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
          <h2 className="text-base font-semibold">Recent patients</h2>
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="field w-auto py-1.5 text-sm"
          >
            {RISK_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="text-left text-ink-secondary border-b border-ink-primary/10">
              <th className="pb-2 font-medium" style={{ width: "35%" }}>Patient</th>
              <th className="pb-2 font-medium" style={{ width: "25%" }}>Concerns</th>
              <th className="pb-2 font-medium" style={{ width: "25%" }}>Assigned</th>
              <th className="pb-2 font-medium" style={{ width: "15%" }}>Risk</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-ink-primary/5 last:border-0">
                <td className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="avatar bg-ocean-100 text-ocean-600">{p.initials}</div>
                    <span className="text-ink-primary">{p.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-ink-secondary truncate">{p.skin_concerns}</td>
                <td className="py-2.5 text-ink-secondary font-mono text-xs">{p.assignedDate}</td>
                <td className="py-2.5">
                  <span className={`pill ${RISK_STYLE[p.risk]}`}>{p.risk}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
