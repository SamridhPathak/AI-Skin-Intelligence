import { useEffect, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import { CONSULTANT_NAV_ITEMS } from "./consultantNav";
import { getConsultantClients } from "../../../services/profile";
import { getInitials } from "../../../utils/initials";
import { SkeletonCard } from "../../../components/Skeleton";

export default function ConsultantAssessments() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConsultantClients().then((res) => setClients(res.data)).finally(() => setLoading(false));
  }, []);

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
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : clients.map((c) => (
              <div key={c.id} className="glass p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="avatar bg-ocean-100 text-ocean-600 w-10 h-10 text-sm">{getInitials(c.name)}</div>
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
        {!loading && clients.length === 0 && (
          <p className="text-ink-secondary col-span-2 text-center py-8">No clients yet.</p>
        )}
      </div>
    </MainLayout>
  );
}
