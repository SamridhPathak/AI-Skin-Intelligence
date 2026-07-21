import MainLayout from "../../../layouts/MainLayout";
import { DERM_NAV_ITEMS } from "./dermNav";
import { MOCK_PATIENTS, RISK_STYLE } from "../../../data/mockDermatologistData";

export default function DermatologistConditionReports() {
  return (
    <MainLayout navItems={DERM_NAV_ITEMS} brandLabel="Skin AI · Dermatologist">
      <header>
        <h1 className="text-xl font-semibold">Condition reports</h1>
        <p className="text-sm text-ink-secondary">
          Patient-reported skin profiles — risk level shown here is illustrative,
          not a clinical assessment. Automated skin condition scoring is Milestone 2 work.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {MOCK_PATIENTS.map((p) => (
          <div key={p.id} className="glass p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="avatar bg-ocean-100 text-ocean-600 w-10 h-10 text-sm">{p.initials}</div>
                <div>
                  <p className="font-medium text-ink-primary">{p.name}</p>
                  <p className="text-xs text-ink-secondary">Age {p.age} · {p.skin_type} skin</p>
                </div>
              </div>
              <span className={`pill ${RISK_STYLE[p.risk]}`}>{p.risk}</span>
            </div>
            <div className="space-y-1.5 text-sm">
              <p><span className="text-ink-secondary">Concerns: </span>{p.skin_concerns}</p>
              <p><span className="text-ink-secondary">Goals: </span>{p.goals}</p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
