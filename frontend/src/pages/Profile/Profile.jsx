import { useEffect, useState } from "react";
import { getMyProfile } from "../../services/profile";

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      setProfile(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch profile");
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        My Skin Profile
      </h1>

      <div className="bg-slate-900 rounded-xl p-8 space-y-4">

        <p><strong>Age:</strong> {profile.age}</p>

        <p><strong>Gender:</strong> {profile.gender}</p>

        <p><strong>Skin Type:</strong> {profile.skin_type}</p>

        <p><strong>Skin Tone:</strong> {profile.skin_tone}</p>

        <p><strong>Skin Concerns:</strong> {profile.skin_concerns}</p>

        <p><strong>Goals:</strong> {profile.goals}</p>

        <p><strong>Allergies:</strong> {profile.allergies}</p>

        <p><strong>Water Intake:</strong> {profile.water_intake}</p>

        <p><strong>Sleep Hours:</strong> {profile.sleep_hours}</p>

        <p><strong>Exercise:</strong> {profile.exercise_frequency}</p>

        <p><strong>Sun Exposure:</strong> {profile.sun_exposure}</p>

        <p><strong>Stress Level:</strong> {profile.stress_level}</p>

      </div>

    </div>
  );
}

export default Profile;