import React from "react";

interface Props {
  method: "manual" | "ai" | "";
  setMethod: (value: "manual" | "ai") => void;
}

const ContentMethodSelector: React.FC<Props> = ({ method, setMethod }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">How do you want to create your petition?</h2>
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 border rounded ${
            method === "manual" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMethod("manual")}
        >
          Write Manually
        </button>
        <button
          className={`px-4 py-2 border rounded ${
            method === "ai" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMethod("ai")}
        >
          Use AI Assistance
        </button>
      </div>
    </div>
  );
};

export default ContentMethodSelector;
