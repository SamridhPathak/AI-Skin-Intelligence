import { useState } from "react";
import { TbNotes } from "react-icons/tb";
import MainLayout from "../../../layouts/MainLayout";
import { DERM_NAV_ITEMS } from "./dermNav";
import { MOCK_PATIENTS } from "../../../data/mockDermatologistData";

export default function DermatologistTreatmentNotes() {
  const [selectedPatient, setSelectedPatient] = useState(MOCK_PATIENTS[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  // Notes live only in this component's state — refreshing the page loses
  // them. Real persistence needs a POST /dermatologist/patients/{id}/notes
  // endpoint, which doesn't exist yet. Everything else here works for real.
  const [notesByPatient, setNotesByPatient] = useState({});

  const patient = MOCK_PATIENTS.find((p) => p.id === Number(selectedPatient));
  const notes = notesByPatient[selectedPatient] || [];

  const addNote = () => {
    if (!draft.trim()) return;
    const entry = { text: draft.trim(), date: new Date().toLocaleString() };
    setNotesByPatient({
      ...notesByPatient,
      [selectedPatient]: [entry, ...notes],
    });
    setDraft("");
  };

  return (
    <MainLayout navItems={DERM_NAV_ITEMS} brandLabel="Skin AI · Dermatologist">
      <header>
        <h1 className="text-xl font-semibold">Treatment notes</h1>
        <p className="text-sm text-ink-secondary">
          Manual notes you write for a patient — this part doesn't depend on any AI engine.
          Not yet saved permanently (no backend endpoint for this yet).
        </p>
      </header>

      <div className="glass p-5">
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="field mb-4 sm:w-72"
        >
          {MOCK_PATIENTS.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        {patient && (
          <>
            <div className="flex gap-2 mb-5">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Add a treatment note for ${patient.name}...`}
                className="field flex-1 min-h-[80px] resize-none"
              />
              <button onClick={addNote} className="btn-primary h-fit self-end">Add note</button>
            </div>

            <div className="flex flex-col gap-3">
              {notes.length === 0 && (
                <p className="text-sm text-ink-secondary text-center py-6">No notes yet for {patient.name}.</p>
              )}
              {notes.map((n, i) => (
                <div key={i} className="glass p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-ocean-100 text-ocean-600 flex items-center justify-center shrink-0">
                    <TbNotes />
                  </div>
                  <div>
                    <p className="text-sm text-ink-primary">{n.text}</p>
                    <p className="text-xs text-ink-secondary mt-1 font-mono">{n.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
