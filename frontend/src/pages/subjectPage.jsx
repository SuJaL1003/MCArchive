import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const SubjectPage = () => {
  const { semester, subject } = useParams();
  const [activeUnit, setActiveUnit] = useState("");
  const [pdfUrls, setPdfUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdfData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/subjects/${semester}/${subject}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        if (data.unitPdfs) {
          setPdfUrls(data.unitPdfs);
          setActiveUnit(Object.keys(data.unitPdfs)[0]);
        }
      } catch (error) {
        setError("Error fetching PDFs: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfData();
  }, [semester, subject]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">
          {subject} - {semester.toUpperCase()}
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex border-b border-purple-300 mb-6">
          {Object.keys(pdfUrls).map((unit) => (
            <button
              key={unit}
              onClick={() => setActiveUnit(unit)}
              className={`px-4 py-2 font-medium ${
                activeUnit === unit
                  ? 'text-white bg-purple-600 rounded-t-md'
                  : 'text-purple-700 bg-purple-100 hover:bg-purple-200'
              }`}
              aria-label={`Select ${unit}`}
            >
              {unit}
            </button>
          ))}
        </div>

        {activeUnit && pdfUrls[activeUnit] && (
          <div className="w-full h-[600px] border rounded shadow-lg overflow-hidden mb-6">
            <iframe
              src={pdfUrls[activeUnit]}
              title={`PDF for ${activeUnit}`}
              width="100%"
              height="100%"
              className="rounded"
            ></iframe>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {/* Cheat Sheet Box */}
          <div className="flex flex-col p-4 border rounded shadow-lg">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Cheat Sheet</h2>
            <p className="text-sm text-gray-700">Download the cheat sheet for this unit:</p>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubjectPage;