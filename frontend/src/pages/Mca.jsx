import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';

const subjectsBySemester = {
  Semester1: ["Database Management System", "Computer Organization and Architecture", "Software Engineering", "Data Structure and Algorithm","Foundation of Computer Science","Object Oriented Programming"],
  Semester2: ["Computer Networks", "Operating Systems", "Software Testing and Quality Assurance", "AI and Machine Learning","Internet of Things","Frontend"],
  Semester3: ["Data Analytics", "Software Project Management", "Mobile Architecture and Programming","Environmental Studies","E-commerce","Cloud Computing","Cyber Security"],
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
