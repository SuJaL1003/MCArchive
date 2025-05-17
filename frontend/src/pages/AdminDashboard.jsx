import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import PDFUploadForm from "../components/PDFUploadForm";
import PYQUploadForm from "../components/PyqUploadForm";

const AdminDashboard = () => {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [mode, setMode] = useState(""); // '' | 'notes' | 'pyq'

  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];
  const units = ["Unit 1", "Unit 2", "Unit 3", "Unit 4"];

  const subjectsBySemester = {
    "Semester 1": [
      "Database Management System",
      "Computer Organization and Architecture",
      "Software Engineering",
      "Data Structure and Algorithm",
      "Foundation of Computer Science",
      "Object Oriented Programming",
    ],
    "Semester 2": [
      "Computer Networks",
      "Operating Systems",
      "Software Testing and Quality Assurance",
      "AI and Machine Learning",
      "Internet of Things",
      "Frontend",
    ],
    "Semester 3": [
      "Data Analytics",
      "Software Project Management",
      "Mobile Architecture and Programming",
      "Environmental Studies",
      "E-commerce",
      "Cloud Computing",
      "Cyber Security",
    ],
    "Semester 4": ["Python", "Cloud Computing", "AI & ML"],
  };

  const subjects = semester ? subjectsBySemester[semester] || [] : [];

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
    setSubject("");
  };

  // Reset all selections when mode changes
  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setSemester("");
    setSubject("");
    setUnit("");
  };

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Admin Dashboard</h2>

        {/* Show initial two cards if mode is not selected */}
        {!mode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              onClick={() => handleModeSelect("notes")}
              className="cursor-pointer bg-violet-600 text-white p-10 rounded-3xl shadow-lg text-center hover:bg-violet-700 transition"
            >
              <h3 className="text-2xl font-bold mb-2">Notes</h3>
              <p>Upload semester-wise notes with unit selection</p>
            </div>

            <div
              onClick={() => handleModeSelect("pyq")}
              className="cursor-pointer bg-yellow-500 text-white p-10 rounded-3xl shadow-lg text-center hover:bg-yellow-600 transition"
            >
              <h3 className="text-2xl font-bold mb-2">
                Previous Year Question Papers (PYQ)
              </h3>
              <p>Upload semester-wise PYQs without unit selection</p>
            </div>
          </div>
        )}

        {/* Show form for Notes mode */}
        {mode === "notes" && (
          <>
            <button
              onClick={() => setMode("")}
              className="mb-6 text-sm underline text-violet-600 hover:text-violet-800"
            >
              ← Back to Dashboard
            </button>

            {/* Semester Selection */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Semester</label>
              <select
                value={semester}
                onChange={handleSemesterChange}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select Semester --</option>
                {semesters.map((sem, idx) => (
                  <option key={idx} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit Selection */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select Unit --</option>
                {units.map((u, idx) => (
                  <option key={idx} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Dropdown - based on semester */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={!semester}
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((subj, idx) => (
                  <option key={idx} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            {/* PDF Upload Form */}
            {semester && subject && unit && (
              <PDFUploadForm
                semester={semester}
                subject={subject}
                unit={unit}
              />
            )}
          </>
        )}

        {/* Show form for PYQ mode */}
        {mode === "pyq" && (
          <>
            <button
              onClick={() => setMode("")}
              className="mb-6 text-sm underline text-violet-600 hover:text-violet-800"
            >
              ← Back to Dashboard
            </button>

            {/* Semester Selection */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Semester</label>
              <select
                value={semester}
                onChange={handleSemesterChange}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select Semester --</option>
                {semesters.map((sem, idx) => (
                  <option key={idx} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* PYQ Dropdown (fixed) */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Type</label>
              <select
                value="PYQ"
                disabled
                className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
              >
                <option value="PYQ">PYQ</option>
              </select>
            </div>
            {/* Subject Dropdown - based on semester */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Select Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2 border rounded"
                disabled={!semester}
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((subj, idx) => (
                  <option key={idx} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>

            {/* PDF Upload Form */}
            {semester && subject && (
              <PYQUploadForm semester={semester} subject={subject} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
