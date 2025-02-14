import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Title */}
      <h1 className="text-3xl font-bold text-[#223843]">Tell your story</h1>
      <p className="text-gray-600 mt-1">
        Start from scratch or use our recommended structure below. You can
        always edit your petition, even after publishing.
      </p>

      {/* CKEditor */}
      <div className="mt-4">
        <CKEditor
          editor={ClassicEditor}
          data={description}
          onChange={(_, editor) => {
            setDescription(editor.getData());
          }}
          config={{
            toolbar: [
              "bold",
              "italic",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "link",
              "imageUpload",
              "undo",
              "redo",
            ],
          }}
        />
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
