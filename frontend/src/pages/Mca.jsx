import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const subjectsBySemester = {
  Semester1: ["Maths", "Computer Fundamentals", "C Programming", "Digital Logic"],
  Semester2: ["Data Structures", "OOP in C++", "DBMS", "Operating Systems"],
  Semester3: ["Java", "Web Technologies", "Software Engineering"],
  Semester4: ["Python", "Cloud Computing", "AI & ML"],
};

const subjectsBySemester1 = {
  Semester1: ["Maths", "Computer Fundamentals", "C Programming", "Digital Logic"],
  Semester2: ["Data Structures", "OOP in C++", "DBMS", "Operating Systems"],
  Semester3: ["Java", "Web Technologies", "Software Engineering"],
  Semester4: ["Python", "Cloud Computing", "AI & ML"],
};

const Mca = () => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();

  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    if (selectedSemester && subject) {
      navigate(`/mca/${selectedSemester}/${subject}`);
    }
  };

  const handleSemesterChange = (e) => {
    const sem = e.target.value;
    setSelectedSemester(sem);
    setSelectedSubject('');
  };

  return (
    <Layout>
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Select your semester</h2>

        {/* Semester Dropdown */}
        <select
          value={selectedSemester}
          onChange={handleSemesterChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        >
          <option value="">-- Select Semester --</option>
          {Object.keys(subjectsBySemester).map((semKey) => (
            <option key={semKey} value={semKey}>
              {semKey.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Subject Dropdown */}
        {selectedSemester && (
          <>
            <label className="block mb-2 font-semibold">Select subject:</label>
            <select
              value={selectedSubject}
              onChange={handleSubjectChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
            >
              <option value="">-- Select Subject --</option>
              {subjectsBySemester[selectedSemester].map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Display Selection */}
        {selectedSubject && (
          <div className="mt-4 text-lg text-gray-700">
            Selected: <strong>{selectedSemester.toUpperCase()} - {selectedSubject}</strong>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Mca;
