import React, { useState, useEffect } from "react";

const semesters = [
  {
    id: 1,
    name: "Semester 1",
    subjects: [
      "Database Management System",
      "Computer Organization and Architecture",
      "Software Engineering",
      "Data Structure and Algorithm",
      "Foundation of Computer Science",
      "Object Oriented Programming",
    ],
  },
  {
    id: 2,
    name: "Semester 2",
    subjects: [
      "Computer Networks",
      "Operating Systems",
      "Software Testing and Quality Assurance",
      "AI and Machine Learning",
      "Internet of Things",
      "Frontend",
    ],
  },
  {
    id: 3,
    name: "Semester 3",
    subjects: [
      "Data Analytics",
      "Software Project Management",
      "Mobile Architecture and Programming",
      "Environmental Studies",
      "E-commerce",
      "Cloud Computing",
      "Cyber Security",
    ],
  },
  {
    id: 4,
    name: "Semester 4",
    subjects: ["Python", "Cloud Computing", "AI & ML"],
  },
];

export default function PYQ() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPYQ = async (semester, subject) => {
    setLoading(true);
    setError(null);
    setPdfUrl("");

    try {
      const normalizedSemester = semester
        .replace(/([a-zA-Z]+)(\d+)/, "$1 $2")
        .trim();
      const response = await fetch(
        `/api/pdf/get-pdfs-by-subject?semester=${normalizedSemester}&subject=${subject}`
      );

      if (!response.ok) throw new Error("Failed to fetch PDFs");

      const data = await response.json();
      console.log("Fetched PDFs:", data.pdfs);

      if (data.pdfs && data.pdfs.length > 0) {
        // ✅ Filter only PYQ (where unit is null or empty)
        const pyqs = data.pdfs.filter((pdf) => !pdf.unit);

        if (pyqs.length > 0) {
          setPdfUrl(pyqs[0].cloudinaryUrl); // Show first PYQ
        } else {
          setError("No PYQs found for this subject.");
        }
      } else {
        setError("No PDFs found for this subject.");
      }
    } catch (err) {
      console.error("Error fetching PDFs:", err);
      setError("Error loading PDFs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSemester && selectedSubject) {
      fetchPYQ(selectedSemester.name, selectedSubject);
    }
  }, [selectedSemester, selectedSubject]);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Previous Year Question Papers
      </h2>

      {/* Semester Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {semesters.map((sem) => (
          <button
            key={sem.id}
            onClick={() => {
              setSelectedSemester(sem);
              setSelectedSubject(null);
              setPdfUrl("");
              setError(null);
            }}
            className={`p-6 rounded-xl shadow-md transition 
              ${
                selectedSemester?.id === sem.id
                  ? "bg-violet-600 text-white"
                  : "bg-white text-gray-800 hover:bg-violet-100"
              }`}
          >
            {sem.name}
          </button>
        ))}
      </div>

      {/* Subject List */}
      {selectedSemester && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-center">
            {selectedSemester.name} Subjects
          </h3>
          <ul className="list-disc list-inside max-w-md mx-auto text-gray-700 text-lg">
            {selectedSemester.subjects.map((subj, idx) => (
              <li
                key={idx}
                onClick={() => setSelectedSubject(subj)}
                className={`mb-2 cursor-pointer hover:text-violet-600 ${
                  selectedSubject === subj ? "font-bold text-violet-800" : ""
                }`}
              >
                {subj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* PDF Viewer */}
      {selectedSubject && (
        <div className="mt-10 text-center">
          <h4 className="text-xl font-semibold mb-4">
            {selectedSubject} - {selectedSemester?.name}
          </h4>

          {loading ? (
            <p className="text-gray-600">Loading PDF...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : pdfUrl ? (
            <>
              <iframe
                src={pdfUrl}
                width="100%"
                height="600px"
                title="PYQ PDF"
                className="border rounded-lg"
              ></iframe>

              <div className="mt-4">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Open PDF in new tab
                </a>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
