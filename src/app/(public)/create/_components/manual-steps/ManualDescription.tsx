"use client";

import { useState, useEffect } from "react";
import { Editor, EditorState, ContentState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

interface ManualDescriptionProps {
  description: string;
  setDescription: (desc: string) => void;
  prevStep: () => void;
  confirmStep: () => void;
}

const ManualDescription: React.FC<ManualDescriptionProps> = ({
  description,
  setDescription,
  prevStep,
  confirmStep,
}) => {
  const [editorState, setEditorState] = useState(() =>
    description
      ? EditorState.createWithContent(ContentState.createFromText(description))
      : EditorState.createEmpty()
  );
  useEffect(() => {
    if (description && description !== editorState.getCurrentContent().getPlainText()) {
      setEditorState(EditorState.createWithContent(ContentState.createFromText(description)));
    }
  }, [description]);
  

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
    const newText = newState.getCurrentContent().getPlainText();
    if (newText !== description) {
      setDescription(newText);
    }
  };
  
  const handleStyleClick = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Title */}
      <h1 className="text-3xl font-bold text-[#223843]">Tell your story</h1>
      <p className="text-gray-600 mt-1">
        Start from scratch or use our recommended structure below. You can always edit your petition, even after publishing.
      </p>

      {/* Toolbar */}
      <div className="flex gap-2 mt-4 p-2 border-b border-gray-300">
        <button
          className="p-1.5 border rounded-md hover:bg-gray-200"
          onClick={() => handleStyleClick("BOLD")}
        >
          <b>B</b>
        </button>
        <button
          className="p-1.5 border rounded-md hover:bg-gray-200"
          onClick={() => handleStyleClick("ITALIC")}
        >
          <i>I</i>
        </button>
        <button
          className="p-1.5 border rounded-md hover:bg-gray-200"
          onClick={() => handleStyleClick("UNDERLINE")}
        >
          <u>U</u>
        </button>
        <button className="p-1.5 border rounded-md hover:bg-gray-200">🔗</button>
        <button className="p-1.5 border rounded-md hover:bg-gray-200">📷</button>
        <button className="p-1.5 border rounded-md hover:bg-gray-200">🎥</button>
      </div>

      {/* Draft.js Editor */}
      <div className="mt-2 border border-gray-300 rounded-lg p-2 min-h-[150px]">
        <Editor editorState={editorState} onChange={handleEditorChange} placeholder="Start writing..." />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-5 py-2 bg-[#E8EBE4] text-[#223843] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
          onClick={prevStep}
        >
          Back
        </button>

        <button
          className={`px-5 py-2 rounded-lg font-semibold shadow-md transition duration-200 ${
            description.trim()
              ? "bg-[#CA3C25] text-white hover:bg-red-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={confirmStep}
          disabled={!description.trim()}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ManualDescription;
