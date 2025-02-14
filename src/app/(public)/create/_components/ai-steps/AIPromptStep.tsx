"use client";

interface AIPromptStepProps {
  userPrompt: string;
  setUserPrompt: (value: string) => void;
  nextStep: () => void;
}

export default function AIPromptStep({ userPrompt, setUserPrompt, nextStep }: AIPromptStepProps) {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6">
      <h1 className="text-3xl font-bold mb-3">Tell us what you want to change</h1>
      <p className="text-gray-700 mb-6">
        We will use this prompt to generate your petition draft.
      </p>
      <label className="block text-lg font-semibold mb-2">I want to...</label>
      <textarea
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md text-lg"
        rows={6}
      ></textarea>
      <div className="flex justify-end mt-4">
        <button onClick={nextStep} className="px-4 py-2 bg-[#CA3C25] text-white rounded">
          Continue
        </button>
      </div>
    </div>
  );
}
