import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProfile } from "../../services/profile";



const SKIN_CONCERNS = [
  "Acne",
  "Blackheads",
  "Whiteheads",
  "Pigmentation",
  "Dark Spots",
  "Dark Circles",
  "Wrinkles",
  "Fine Lines",
  "Large Pores",
  "Dryness",
  "Oiliness",
  "Redness",
  "Sensitive Skin",
  "Dullness",
];

function CreateProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    skin_type: "",
    skin_tone: "",
    skin_concerns: [],
    allergies: "",
    goals: "",
    water_intake: "",
    sleep_hours: "",
    exercise_frequency: "",
    stress_level: "",
    sun_exposure: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleConcern = (concern) => {
    setFormData((prev) => ({
        ...prev,
        skin_concerns: prev.skin_concerns.includes(concern)
        ? prev.skin_concerns.filter((item) => item !== concern)
        : [...prev.skin_concerns, concern],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        skin_concerns: formData.skin_concerns.join(", "),
      };
      await createProfile(payload);

      alert("Profile Created Successfully");

      navigate("/profile");
    } catch (err) {
      console.log(err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center py-10">
      <div className="bg-slate-900 w-[700px] rounded-xl p-10">

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Create Skin Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          {/* Age */}
          <input
            type="number"
            name="age"
            min="10"
            max="100"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Skin Type */}
          <select
            name="skin_type"
            value={formData.skin_type}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          >
            <option value="">Skin Type</option>
            <option value="Normal">Normal</option>
            <option value="Dry">Dry</option>
            <option value="Oily">Oily</option>
            <option value="Combination">Combination</option>
            <option value="Sensitive">Sensitive</option>
          </select>

          {/* Skin Tone */}
          <select
            name="skin_tone"
            value={formData.skin_tone}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          >
            <option value="">Skin Tone</option>
            <option value="Very Fair">Very Fair</option>
            <option value="Fair">Fair</option>
            <option value="Light">Light</option>
            <option value="Wheatish">Wheatish</option>
            <option value="Tan">Tan</option>
            <option value="Deep">Deep</option>
          </select>

          {/* Skin Concern */}
          <div className="col-span-2">

            <label className="block text-white mb-3 font-semibold">
                Skin Concerns
            </label>

            <div className="flex flex-wrap gap-2">

                {SKIN_CONCERNS.map((concern) => (

                <button
                    key={concern}
                    type="button"
                    onClick={() => toggleConcern(concern)}
                    className={`px-4 py-2 rounded-full border transition ${
                    formData.skin_concerns.includes(concern)
                        ? "bg-cyan-500 border-cyan-500 text-white"
                        : "bg-slate-800 border-slate-700 text-gray-300"
                    }`}
                >
                    {concern}
                </button>

                ))}

            </div>

           </div>

          {/* Allergies */}
          <input
            name="allergies"
            placeholder="Allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />

          {/* Goals */}
          <input
            name="goals"
            placeholder="Goals"
            value={formData.goals}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />

          {/* Water Intake */}
          <input
            type="number"
            step="0.5"
            min="0"
            max="10"
            name="water_intake"
            placeholder="Water Intake (Litres)"
            value={formData.water_intake}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />

          {/* Sleep Hours */}
          <input
            type="number"
            step="0.5"
            min="0"
            max="24"
            name="sleep_hours"
            placeholder="Sleep Hours"
            value={formData.sleep_hours}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          />

          {/* Exercise */}
          <select
            name="exercise_frequency"
            value={formData.exercise_frequency}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          >
            <option value="">Exercise</option>
            <option value="Never">Never</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </select>

          {/* Stress Level */}
          <select
            name="stress_level"
            value={formData.stress_level}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          >
            <option value="">Stress Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Sun Exposure */}
          <select
            name="sun_exposure"
            value={formData.sun_exposure}
            onChange={handleChange}
            className="p-3 rounded bg-slate-800 text-white"
          >
            <option value="">Sun Exposure</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button
            type="submit"
            className="col-span-2 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold transition"
          >
            Save Profile
          </button>

        </form>

      </div>
    </div>
  );
}

export default CreateProfile;