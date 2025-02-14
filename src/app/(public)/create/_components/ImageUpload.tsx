"use client";

import { useState } from "react";

interface ImageUploadProps {
  image: File | null;
  setImage: (image: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-[#223843]">Upload an Image</h2>
      <p className="text-gray-600 text-center mt-2">
        Add an image to make your petition more impactful.
      </p>

      <div className="mt-4 w-full text-center">
        {preview ? (
          <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-md shadow-md" />
        ) : (
          <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md">
            <p className="text-gray-500">No Image Selected</p>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-4 cursor-pointer text-sm text-gray-500"
      />

      {image && (
        <button
          className="mt-2 text-red-500 text-sm hover:underline"
          onClick={() => {
            setImage(null);
            setPreview(null);
          }}
        >
          Remove Image
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
