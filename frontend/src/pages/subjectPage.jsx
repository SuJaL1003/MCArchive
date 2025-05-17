import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const SubjectPage = () => {
const { semester, subject } = useParams();
const [activeUnit, setActiveUnit] = useState('');
const [unitPdfs, setUnitPdfs] = useState({});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchPdfData = async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Fix: Normalize "Semester2" to "Semester 2"
      const normalizedSemester = semester.replace(/([a-zA-Z]+)(\d+)/, "$1 $2").trim();
      const normalizedSubject = subject.trim();

      const response = await fetch(
        `/api/pdf/get-pdfs-by-subject?semester=${normalizedSemester}&subject=${normalizedSubject}`
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      if (data.pdfs && data.pdfs.length > 0) {
        const pdfsByUnit = data.pdfs.reduce((acc, pdf) => {
          const unitKey = `Unit ${pdf.unit}`;
          if (!acc[unitKey]) acc[unitKey] = [];
          acc[unitKey].push(pdf);
          return acc;
        }, {});
        setUnitPdfs(pdfsByUnit);

        const sortedUnits = Object.keys(pdfsByUnit).sort();
        if (sortedUnits.length > 0) {
          setActiveUnit(sortedUnits[0]);
        }
      } else {
        setUnitPdfs({});
      }
    } catch (err) {
      console.error("Failed to fetch PDFs:", err);
      setError("Failed to load PDFs");
    } finally {
      setLoading(false);
    }
  };

  fetchPdfData();
}, [semester, subject]);


  const renderUnitButtons = () => {
    return Object.keys(unitPdfs)
      .sort()
      .map((unit) => (
        <button
          key={unit}
          className={`px-4 py-2 rounded m-2 ${
            activeUnit === unit ? 'bg-purple-700 text-white' : 'bg-purple-200 text-purple-800'
          }`}
          onClick={() => setActiveUnit(unit)}
        >
          {unit}
        </button>
      ));
  };

  const renderPdfs = () => {
    if (!activeUnit || !unitPdfs[activeUnit] || unitPdfs[activeUnit].length === 0) return null;

    const selectedPdf = unitPdfs[activeUnit][0]; // show first PDF only

    return (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">{selectedPdf.fileName}</h3>
        <iframe
          src={selectedPdf.cloudinaryUrl}
          width="100%"
          height="600px"
          title={selectedPdf.fileName}
          style={{ border: "none" }}
        ></iframe>
      </div>
    );
  };

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          {subject} - {semester.toUpperCase()}
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading PDFs...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : Object.keys(unitPdfs).length === 0 ? (
          <p className="text-gray-600">No PDFs found for this subject.</p>
        ) : (
          <>
            <div className="flex flex-wrap mb-4">{renderUnitButtons()}</div>
            {renderPdfs()}
          </>
        )}
      </div>
    </Layout>
  );
};

export default SubjectPage;
