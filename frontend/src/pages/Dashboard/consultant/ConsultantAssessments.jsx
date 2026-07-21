import MainLayout from "../../../layouts/MainLayout";
import { CONSULTANT_NAV_ITEMS } from "./consultantNav";
import { MOCK_CLIENTS } from "../../../data/mockConsultantData";

export default function ConsultantAssessments() {
  return (
    <MainLayout navItems={CONSULTANT_NAV_ITEMS} brandLabel="Skin AI · Consultant">
      <header>
        <h1 className="text-xl font-semibold">Assessments</h1>
        <p className="text-sm text-ink-secondary">
          Client-reported skin profiles — not an automated clinical score.
          The scoring/assessment engine lands with Milestone 2.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {MOCK_CLIENTS.map((c) => (
          <div key={c.id} className="glass p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="avatar bg-ocean-100 text-ocean-600 w-10 h-10 text-sm">{c.initials}</div>
              <div>
                <p className="font-medium text-ink-primary">{c.name}</p>
                <p className="text-xs text-ink-secondary">Age {c.age} · {c.skin_type} skin</p>
              </div>
            </div>
            <div className="space-y-1.5 text-sm">
              <p><span className="text-ink-secondary">Concerns: </span>{c.skin_concerns}</p>
              <p><span className="text-ink-secondary">Goals: </span>{c.goals}</p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
