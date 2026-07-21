import { useMemo, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import { DERM_NAV_ITEMS } from "./dermNav";
import { MOCK_PATIENTS, RISK_OPTIONS, RISK_STYLE } from "../../../data/mockDermatologistData";

export default function DermatologistPatients() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All risk levels");

  const filtered = useMemo(() => {
    return MOCK_PATIENTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesRisk = riskFilter === "All risk levels" || p.risk === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [search, riskFilter]);

  return (
    <MainLayout navItems={DERM_NAV_ITEMS} brandLabel="Skin AI · Dermatologist">
      <header>
        <h1 className="text-xl font-semibold">Patients</h1>
        <p className="text-sm text-ink-secondary">{filtered.length} of {MOCK_PATIENTS.length} patients</p>
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
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="field sm:w-48">
            {RISK_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
          <thead>
            <tr className="text-left text-ink-secondary border-b border-ink-primary/10">
              <th className="pb-2 font-medium" style={{ width: "25%" }}>Patient</th>
              <th className="pb-2 font-medium" style={{ width: "10%" }}>Age</th>
              <th className="pb-2 font-medium" style={{ width: "20%" }}>Skin type</th>
              <th className="pb-2 font-medium" style={{ width: "30%" }}>Concerns</th>
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
                <td className="py-2.5 text-ink-secondary">{p.age}</td>
                <td className="py-2.5 text-ink-secondary">{p.skin_type}</td>
                <td className="py-2.5 text-ink-secondary truncate">{p.skin_concerns}</td>
                <td className="py-2.5">
                  <span className={`pill ${RISK_STYLE[p.risk]}`}>{p.risk}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-ink-secondary">No patients match your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
