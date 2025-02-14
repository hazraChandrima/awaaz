import React from "react";

interface Props {
  scope: string;
  location: string;
  category: string;
  title: string;
  description: string;
  image: File | null;
  submitPetition: () => void;
}

const ReviewAndPublish: React.FC<Props> = ({ scope, location, category, title, description, image, submitPetition }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Review Your Petition</h2>
      <p><strong>Scope:</strong> {scope}</p>
      {location && <p><strong>Location:</strong> {location}</p>}
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Description:</strong> {description}</p>
      {image && <img src={URL.createObjectURL(image)} alt="Preview" className="w-32 h-32 mt-2" />}
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={submitPetition}>
        Publish Petition
      </button>
    </div>
  );
};

export default ReviewAndPublish;
