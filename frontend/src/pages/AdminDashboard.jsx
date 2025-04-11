import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import PDFUploadForm from '../components/PDFUploadForm';

const AdminDashboard = () => {
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');

  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Dashboard</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Select Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select Semester --</option>
            {semesters.map((sem, idx) => (
              <option key={idx} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Enter Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Data Structures"
            className="w-full p-2 border rounded"
          />
        </div>

        {semester && subject && (
          <PDFUploadForm semester={semester} subject={subject} />
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;

