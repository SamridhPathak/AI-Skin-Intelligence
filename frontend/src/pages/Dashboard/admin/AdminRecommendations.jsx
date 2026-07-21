import { TbShieldCheck } from "react-icons/tb";
import MainLayout from "../../../layouts/MainLayout";
import { ADMIN_NAV_ITEMS } from "./adminNav";

export default function AdminRecommendations() {
  return (
    <MainLayout navItems={ADMIN_NAV_ITEMS} brandLabel="Skin AI · Admin">
      <header>
        <h1 className="text-xl font-semibold">Recommendations</h1>
        <p className="text-sm text-ink-secondary">Monitor what the recommendation engine is surfacing to users</p>
      </header>

      <div className="glass p-12 flex flex-col items-center text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-ocean-100 text-ocean-600 flex items-center justify-center text-2xl">
          <TbShieldCheck />
        </div>
        <h2 className="text-base font-medium">Not available yet</h2>
        <p className="text-sm text-ink-secondary max-w-sm">
          This tab will show live recommendation activity once the Ingredient
          Intelligence and Product Recommendation engines are built in
          Milestone 2. There's nothing real to monitor here yet — showing
          mock data would misrepresent a feature that doesn't exist.
        </p>
      </div>
    </MainLayout>
  );
}
