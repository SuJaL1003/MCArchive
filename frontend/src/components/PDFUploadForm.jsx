import React, { useState } from 'react';
import axios from 'axios';

const PDFUploadForm = ({ semester, subject, unit }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // 🆕 loading state

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert('Please select a PDF');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('semester', semester);
    formData.append('subject', subject);
    formData.append('unit', unit);

    try {
      setLoading(true); // start loading
      const res = await axios.post('/api/admin/upload-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(res.data.msg || 'Uploaded!');
      setFile(null); // clear file input after success
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <form onSubmit={handleUpload} className="border p-4 rounded shadow">
      <p className="mb-2 font-semibold">
        Uploading PDF for <span className="text-purple-600">{subject}</span> ({semester}) - {unit}
      </p>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-purple-600 text-white px-4 py-2 rounded ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-purple-700'}`}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default PDFUploadForm;
