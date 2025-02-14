"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import HardBreak from "@tiptap/extension-hard-break";
import { useCallback } from "react";

interface AIReviewStepProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  prevStep: () => void;
  confirmStep: () => void;
}

export default function AIReviewStep({
  title,
  setTitle,
  description,
  setDescription,
  prevStep,
  confirmStep,
}: AIReviewStepProps) {
  const processedTitle = title.replace(/[*"]/g, ""); // Remove * and "
  const processedContent = description.replace(/[*"]/g, ""); // Remove * and "

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      BulletList,
      OrderedList,
      ListItem,
      Link,
      Image,
      HardBreak.configure({ keepMarks: false }),
    ],
    content: processedContent,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const url = prompt("Enter image URL");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Here is your petition draft</h1>
      <p className="text-gray-700 mb-4">
        You are responsible for your petition’s content: review the facts and edit to make sure it reflects your story.
      </p>

      {/* Title Input */}
      <label className="block text-lg font-medium mb-1">Petition title</label>
      <input
        type="text"
        value={processedTitle}
        onChange={(e) => setTitle(e.target.value.replace(/[*"]/g, ""))}
        className="w-full p-2 border border-gray-400 rounded-md mb-4"
      />

      {/* Description Input - Tiptap with Toolbar */}
      <label className="block text-lg font-medium mb-1">Petition description</label>
      <div className="border border-gray-400 rounded-md p-2">
        {/* Toolbar */}
        <div className="flex gap-2 border-b pb-2 mb-2">
          <button onClick={() => editor?.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded">
            <b>B</b>
          </button>
          <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded">
            <i>I</i>
          </button>
          <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="px-2 py-1 border rounded">
            • List
          </button>
          <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="px-2 py-1 border rounded">
            1. List
          </button>
          <button
            onClick={() => {
              const url = prompt("Enter URL");
              if (url) editor?.chain().focus().setLink({ href: url }).run();
            }}
            className="px-2 py-1 border rounded"
          >
            🔗
          </button>
          <button onClick={addImage} className="px-2 py-1 border rounded">
            🖼
          </button>
        </div>

        {/* Tiptap Editor */}
        <EditorContent editor={editor} className="p-2 min-h-[150px]" />
      </div>

      <div className="mt-4 flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 border border-gray-600 text-gray-800 rounded">
          Back
        </button>
        <button onClick={confirmStep} className="px-4 py-2 bg-[#CA3C25] text-white rounded">
          Confirm & Next
        </button>
      </div>
    </div>
  );
}
