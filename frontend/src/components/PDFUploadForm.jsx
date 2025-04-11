import React, { useState } from 'react';
import axios from 'axios';

const PDFUploadForm = ({ semester, subject }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert('Please select a PDF');

    const formData = new FormData();
    formData.append('file', file)
    formData.append('semester', semester);
    formData.append('subject', subject);
    formData.append('title', 'Unit 1');

    try {
      const res = await axios.post('/api/admin/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message || 'Uploaded!');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <form onSubmit={handleUpload} className="border p-4 rounded shadow">
      <p className="mb-2 font-semibold">Uploading PDF for <span className="text-purple-600">{subject}</span> ({semester})</p>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Upload
      </button>
    </form>
  );
};

export default PDFUploadForm;
