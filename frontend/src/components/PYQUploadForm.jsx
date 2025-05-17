import React, { useState } from "react";
import axios from "axios";

const PyqUploadForm = ({ semester, subject }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("semester", semester);
    formData.append("subject", subject);
    // No unit for PYQ

    try {
      setLoading(true);
      const res = await axios.post("/api/pdf/admin/upload-pyq", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.msg || "Uploaded!");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!semester || !subject) return null;

  return (
    <form onSubmit={handleUpload} className="border p-4 rounded shadow">
      <p className="mb-2 font-semibold">
        Uploading PYQ for <span className="text-yellow-600">{subject}</span> (
        {semester})
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
        className={`bg-yellow-500 text-white px-4 py-2 rounded ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:bg-yellow-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload PYQ"}
      </button>
    </form>
  );
};

export default PyqUploadForm;
