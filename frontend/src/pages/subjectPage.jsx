import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const unitPdfs = {
  "Unit 1": "https://example.com/unit1.pdf",
  "Unit 2": "https://example.com/unit2.pdf",
  "Unit 3": "https://example.com/unit3.pdf",
  "Unit 4": "https://example.com/unit4.pdf",
};

const subjectPage = () => {
  const { semester, subject } = useParams();
  const [activeUnit, setActiveUnit] = useState("Unit 1");

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          {subject} - {semester.toUpperCase()}
        </h1>

        {/* Tab Navigation */}
        <div className="flex border-b border-purple-300 mb-6">
          {Object.keys(unitPdfs).map((unit) => (
            <button
              key={unit}
              onClick={() => setActiveUnit(unit)}
              className={`px-4 py-2 font-medium ${
                activeUnit === unit
                  ? 'text-white bg-purple-600 rounded-t-md'
                  : 'text-purple-700 bg-purple-100 hover:bg-purple-200'
              }`}
            >
              {unit}
            </button>
          ))}
        </div>

        {/* PDF Preview and Boxes */}
        <div className="flex mb-6 gap-8">
          {/* PDF Preview */}
          <div className="w-2/3 h-[600px] border rounded shadow-lg overflow-hidden">
            <iframe
              src={unitPdfs[activeUnit]}
              title={activeUnit}
              width="100%"
              height="100%"
              className="rounded"
            ></iframe>
          </div>

          {/* Cheat Sheet and PYQ Boxes */}
          <div className="flex flex-col gap-6 w-1/3">
            {/* Cheat Sheet Box */}
            <div className="flex flex-col p-4 border rounded shadow-lg">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">Cheat Sheet</h2>
              <p className="text-sm text-gray-700">Download the cheat sheet for this unit:</p>
              <a href="https://example.com/cheatsheet.pdf" className="text-blue-500 hover:underline">
                Cheat Sheet PDF
              </a>
              <a href="https://example.com/cheatsheet.pdf" className="text-blue-500 hover:underline">
                Cheat Sheet PDF
              </a>
              <a href="https://example.com/cheatsheet.pdf" className="text-blue-500 hover:underline">
                Cheat Sheet PDF
              </a>
              <a href="https://example.com/cheatsheet.pdf" className="text-blue-500 hover:underline">
                Cheat Sheet PDF
              </a>
            </div>

            {/* PYQ Box */}
            <div className="flex flex-col p-4 border rounded shadow-lg">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">Previous Year Questions (PYQ)</h2>
              <p className="text-sm text-gray-700">Download previous year questions for this unit:</p>
              <a href="https://example.com/pyq.pdf" className="text-blue-500 hover:underline">
                PYQ PDF
              </a>
              <a href="https://example.com/pyq.pdf" className="text-blue-500 hover:underline">
                PYQ PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default subjectPage;
