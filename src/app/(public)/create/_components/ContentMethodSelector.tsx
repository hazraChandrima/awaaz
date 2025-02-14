import React from "react";

interface Props {
  method: "manual" | "ai" | "";
  setMethod: (value: "manual" | "ai") => void;
}

const ContentMethodSelector: React.FC<Props> = ({ method, setMethod }) => {
  return (
    <div className="flex flex-col items-center px-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-black mb-3 text-center">
        Do you need help writing your petition?
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-4 w-full max-w-lg">
        <button
          className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
            method === "ai"
              ? "border-black bg-gray-100 shadow-md"
              : "border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setMethod("ai")}
        >
          <span className="font-semibold text-lg">Yes, please</span>
          <p className="text-gray-600 text-sm">We’ll use AI to generate a draft for you.</p>
        </button>

        <button
          className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
            method === "manual"
              ? "border-black bg-gray-100 shadow-md"
              : "border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setMethod("manual")}
        >
          <span className="font-semibold text-lg">No, thank you</span>
          <p className="text-gray-600 text-sm">Write your petition on your own.</p>
        </button>
      </div>
    </div>
  );
};

export default ContentMethodSelector;
