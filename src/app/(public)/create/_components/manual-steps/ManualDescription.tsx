import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

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
  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, BulletList, ListItem, Link, Image],
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Title */}
      <h1 className="text-3xl font-bold text-[#223843]">Tell your story</h1>
      <p className="text-gray-600 mt-1">
        Start from scratch or use our recommended structure below. You can
        always edit your petition, even after publishing.
      </p>

      {/* Toolbar */}
      <div className="mt-4 flex gap-2 border-b pb-2">
        <button
          className={`p-2 text-[#223843] rounded-md ${
            editor?.isActive("bold") ? "bg-gray-300" : ""
          }`}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <b>B</b>
        </button>
        <button
          className={`p-2 text-[#223843] rounded-md ${
            editor?.isActive("italic") ? "bg-gray-300" : ""
          }`}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <i>I</i>
        </button>
        <button
          className="p-2 text-[#223843] rounded-md"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>
        <button
          className="p-2 text-[#223843] rounded-md"
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editor?.chain().focus().setLink({ href: url }).run();
          }}
        >
          🔗
        </button>
      </div>

      {/* Editor */}
      <div className="mt-2 border border-gray-300 rounded-md p-2 min-h-[150px]">
        <EditorContent editor={editor} />
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
