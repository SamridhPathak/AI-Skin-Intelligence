import { useEffect, useState } from "react";
import {
  TbUser, TbDroplet, TbMoon, TbRun, TbSun, TbBolt,
  TbAlertCircle, TbTarget, TbPalette, TbId,
} from "react-icons/tb";
import { getMyProfile } from "../../services/profile";
import MainLayout from "../../layouts/MainLayout";
import SkinHealthRing from "../../components/SkinHealthRing";

const NAV_ITEMS = [{ label: "My profile", icon: <TbUser />, to: "/profile" }];

// Simple, transparent lifestyle indicator from the fields we actually have.
// Not a clinical skin-health score (that lands with the real scoring engine
// in Milestone 2) — just a friendlier way to surface the numbers you already gave us.
function lifestyleScore(profile) {
  const waterScore = Math.min(profile.water_intake / 3, 1) * 100;
  const sleepScore = Math.min(profile.sleep_hours / 8, 1) * 100;
  const stressScore = { Low: 100, Medium: 65, High: 35 }[profile.stress_level] ?? 60;
  return Math.round((waterScore + sleepScore + stressScore) / 3);
}

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      setProfile(res.data);
    } catch (err) {
      setError("Unable to load your profile right now.");
    }
  };

  if (error) {
    return (
      <MainLayout navItems={NAV_ITEMS} brandLabel="Skin AI">
        <p className="pill pill-flagged py-2 px-4 w-fit">{error}</p>
      </MainLayout>
    );
  }

  if (!profile) {
    return (
      <MainLayout navItems={NAV_ITEMS} brandLabel="Skin AI">
        <p className="text-ink-secondary">Loading your profile...</p>
      </MainLayout>
    );
  }

  const fields = [
    { icon: <TbId />, label: "Age", value: profile.age },
    { icon: <TbUser />, label: "Gender", value: profile.gender },
    { icon: <TbPalette />, label: "Skin type", value: profile.skin_type },
    { icon: <TbPalette />, label: "Skin tone", value: profile.skin_tone },
    { icon: <TbTarget />, label: "Goals", value: profile.goals },
    { icon: <TbAlertCircle />, label: "Allergies", value: profile.allergies },
    { icon: <TbDroplet />, label: "Water intake", value: `${profile.water_intake} L/day` },
    { icon: <TbMoon />, label: "Sleep", value: `${profile.sleep_hours} hrs` },
    { icon: <TbRun />, label: "Exercise", value: profile.exercise_frequency },
    { icon: <TbSun />, label: "Sun exposure", value: profile.sun_exposure },
    { icon: <TbBolt />, label: "Stress level", value: profile.stress_level },
  ];

  return (
    <MainLayout navItems={NAV_ITEMS} brandLabel="Skin AI">
      <header className="flex items-center justify-between animate-in">
        <div>
          <h1 className="text-xl font-semibold">My skin profile</h1>
          <p className="text-sm text-ink-secondary">Concerns: {profile.skin_concerns}</p>
        </div>
        <SkinHealthRing
          value={lifestyleScore(profile)}
          tone="ocean"
          size={72}
          label="Lifestyle balance"
        />
      </header>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {fields.map((f, i) => (
          <div
            key={f.label}
            className={`glass lift p-4 flex items-center gap-3 animate-in delay-${Math.min((i % 5) + 1, 5)}`}
          >
            <div className="w-9 h-9 rounded-full bg-ocean-100 text-ocean-600 flex items-center justify-center text-lg shrink-0">
              {f.icon}
            </div>
            <div className="min-w-0">
              <p className="metric-label">{f.label}</p>
              <p className="text-sm font-medium text-ink-primary truncate">{f.value || "—"}</p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Profile;
