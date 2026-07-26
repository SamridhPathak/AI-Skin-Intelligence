import { useEffect, useState } from "react";
import { TbDownload, TbFileReport } from "react-icons/tb";
import MainLayout from "../../../layouts/MainLayout";
import { ADMIN_NAV_ITEMS } from "./adminNav";
import { getAllUsers } from "../../../services/admin";

export default function AdminReports() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data)).catch(() => {});
  }, []);

  const exportUsersCsv = () => {
    const headers = ["Name", "Email", "Role", "Joined"];
    const rows = users.map((u) => [
      u.full_name, u.email, u.role, new Date(u.created_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const REPORT_TYPES = [
    { title: "User report", desc: "Full user list with role and join date — now real data", action: exportUsersCsv, available: true },
    { title: "Skin assessment reports", desc: "Per-user skin assessment summaries", available: false },
    { title: "Progress reports", desc: "Routine adherence and improvement tracking", available: false },
    { title: "Recommendation reports", desc: "What the engine recommended and why", available: false },
  ];

  return (
    <MainLayout navItems={ADMIN_NAV_ITEMS} brandLabel="Skin AI · Admin">
      <header>
        <h1 className="text-xl font-semibold">Reports</h1>
        <p className="text-sm text-ink-secondary">Export platform data</p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {REPORT_TYPES.map((r) => (
          <div key={r.title} className="glass p-5 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-ocean-100 text-ocean-600 flex items-center justify-center text-lg">
              <TbFileReport />
            </div>
            <div>
              <h3 className="font-medium text-ink-primary">{r.title}</h3>
              <p className="text-sm text-ink-secondary">{r.desc}</p>
            </div>
            {r.available ? (
              <button onClick={r.action} className="btn-outline text-sm flex items-center gap-2 w-fit">
                <TbDownload /> Export CSV
              </button>
            ) : (
              <span className="pill pill-pending w-fit">Needs Milestone 2 data</span>
            )}
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
