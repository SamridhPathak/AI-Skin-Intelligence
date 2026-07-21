import { TbShieldCheck } from "react-icons/tb";
import MainLayout from "../../../layouts/MainLayout";
import { CONSULTANT_NAV_ITEMS } from "./consultantNav";

export default function ConsultantRecommendations() {
  return (
    <MainLayout navItems={CONSULTANT_NAV_ITEMS} brandLabel="Skin AI · Consultant">
      <header>
        <h1 className="text-xl font-semibold">Recommendations</h1>
        <p className="text-sm text-ink-secondary">Manage and review recommendations sent to your clients</p>
      </header>

      <div className="glass p-12 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-ocean-100 text-ocean-600 flex items-center justify-center text-2xl">
          <TbShieldCheck />
        </div>
        <h2 className="text-base font-medium">Not available yet</h2>
        <p className="text-sm text-ink-secondary max-w-sm">
          Recommendation management needs the Product Recommendation Engine
          from Milestone 2. Nothing to manage here until that exists.
        </p>
      </div>
    </MainLayout>
  );
}
