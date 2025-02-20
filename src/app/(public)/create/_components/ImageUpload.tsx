"use client";

import { useState } from "react";

interface ImageUploadProps {
  image: File | null;
  setImage: (image: File | null) => void;
  setUploadedImageUrl: (url: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage, setUploadedImageUrl }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setError(null);
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setUploadedImageUrl(data.url);
      } else {
        setError(data.error || "Upload failed.");
      }
    } catch (err) {
      console.log("Something went wrong.", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-[#223843] text-center">Add an image</h2>
      <p className="text-gray-600 text-center mt-1">
        Petitions with a photo get six times more signatures than petitions without a photo.
      </p>
      <div className="mt-4 border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center">
        {preview ? (
          <img src={preview} alt="Preview" className="w-60 h-40 object-cover rounded-md shadow-md" />
        ) : (
          <div className="flex flex-col items-center text-gray-500">
            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h14m4 4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            <p>Drag & drop an image</p>
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageUpload" />
        <label
          htmlFor="imageUpload"
          className="mt-4 px-6 py-2 border border-[#CA3C25] text-[#CA3C25] font-semibold rounded-lg cursor-pointer hover:bg-[#CA3C25] hover:text-white transition duration-200"
        >Select an Image
        </label>
        {image && (
          <button
            className="mt-4 px-6 py-2 bg-[#CA3C25] text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <p className="text-gray-500 text-sm mt-3 text-center">
        Image sizes of at least <strong>1200 × 675 pixels</strong> will look good on all screens.
      </p>
    </div>
  );
};

export default ImageUpload;
