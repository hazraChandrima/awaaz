import React from "react";

interface Props {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  image: File | null;
  setImage: (file: File | null) => void;
}

const ManualForm: React.FC<Props> = ({ title, setTitle, description, setDescription, image, setImage }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Enter Petition Details</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded mb-2"
      />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
    </div>
  );
};

export default ManualForm;
