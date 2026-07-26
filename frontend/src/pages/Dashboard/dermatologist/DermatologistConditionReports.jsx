import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import { DERM_NAV_ITEMS } from "./dermNav";
import { getDermatologistPatients } from "../../../services/profile";
import { getInitials } from "../../../utils/initials";
import { SkeletonCard } from "../../../components/Skeleton";

export default function DermatologistConditionReports() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDermatologistPatients().then((res) => setPatients(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout navItems={DERM_NAV_ITEMS} brandLabel="Skin AI · Dermatologist">
      <header>
        <h1 className="text-xl font-semibold">Condition reports</h1>
        <p className="text-sm text-ink-secondary">
          Patient-reported skin profiles. Automated skin condition scoring is Milestone 2 work.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : patients.map((p) => (
              <div key={p.id} className="glass p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="avatar bg-ocean-100 text-ocean-600 w-10 h-10 text-sm">{getInitials(p.name)}</div>
                  <div>
                    <p className="font-medium text-ink-primary">{p.name}</p>
                    <p className="text-xs text-ink-secondary">Age {p.age} · {p.skin_type} skin</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p><span className="text-ink-secondary">Concerns: </span>{p.skin_concerns}</p>
                  <p><span className="text-ink-secondary">Goals: </span>{p.goals}</p>
                </div>
              </div>
            ))}
        {!loading && patients.length === 0 && (
          <p className="text-ink-secondary col-span-2 text-center py-8">No patients yet.</p>
        )}
      </div>
    </MainLayout>
  );
}
