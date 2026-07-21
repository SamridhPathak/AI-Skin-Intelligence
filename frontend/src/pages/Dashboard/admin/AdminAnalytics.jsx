import MainLayout from "../../../layouts/MainLayout";
import { ADMIN_NAV_ITEMS } from "./adminNav";
import { MOCK_USERS, MOCK_SIGNUP_TREND } from "../../../data/mockAdminData";

// Small dependency-free bar chart — avoids pulling in a charting library
// for what's currently mock data. Swap MOCK_SIGNUP_TREND for a real
// GET /admin/platform-stats response later; the chart itself won't need to change.
function TrendChart({ data }) {
  const max = Math.max(...data.map((d) => d.value));
  const width = 560;
  const height = 160;
  const barWidth = width / data.length - 12;

  return (
    <svg viewBox={`0 0 ${width} ${height + 24}`} className="w-full h-auto">
      {data.map((d, i) => {
        const barHeight = (d.value / max) * height;
        const x = i * (width / data.length) + 6;
        const y = height - barHeight;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={6}
              fill="var(--color-ocean-500)"
              opacity={0.85}
            />
            <text x={x + barWidth / 2} y={height + 18} textAnchor="middle" fontSize="11" fill="var(--color-ink-secondary)">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function RoleBar({ label, count, total, color }) {
  const pct = Math.round((count / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="capitalize text-ink-primary">{label}</span>
        <span className="text-ink-secondary font-mono text-xs">{count} · {pct}%</span>
      </div>
      <div className="h-2 rounded-pill bg-white/50 overflow-hidden">
        <div className="h-full rounded-pill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  const total = MOCK_USERS.length;
  const roleCounts = ["user", "consultant", "dermatologist", "admin"].map((role) => ({
    role,
    count: MOCK_USERS.filter((u) => u.role === role).length,
  }));
  const roleColors = {
    user: "var(--color-ocean-500)",
    consultant: "var(--color-sage-500)",
    dermatologist: "var(--color-clay-500)",
    admin: "var(--color-danger-500)",
  };

  return (
    <MainLayout navItems={ADMIN_NAV_ITEMS} brandLabel="Skin AI · Admin">
      <header>
        <h1 className="text-xl font-semibold">Analytics</h1>
        <p className="text-sm text-ink-secondary">Platform-level trends — mock data until real usage exists</p>
      </header>

      <div className="glass p-5">
        <h2 className="text-base font-semibold mb-4">Signups this week</h2>
        <TrendChart data={MOCK_SIGNUP_TREND} />
      </div>

      <div className="glass p-5">
        <h2 className="text-base font-semibold mb-4">Role distribution</h2>
        <div className="flex flex-col gap-4">
          {roleCounts.map((r) => (
            <RoleBar key={r.role} label={r.role} count={r.count} total={total} color={roleColors[r.role]} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
