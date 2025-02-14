"use client";

interface AIPersonalStoryStepProps {
  personalStory: string;
  setPersonalStory: (value: string) => void;
  prevStep: () => void;
  generateAIContent: () => void;
}

export default function AIPersonalStoryStep({
  personalStory,
  setPersonalStory,
  prevStep,
  generateAIContent,
}: AIPersonalStoryStepProps) {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6">
      <h1 className="text-3xl font-bold mb-1">One last thing</h1>
      <p className="text-gray-600 text-lg mb-6">(Optional)</p>
      <p className="text-gray-700 mb-6">
        Adding a personal story will make the petition stronger.
      </p>
      <label className="block text-lg font-semibold mb-2">Why is it personal to you?</label>
      <textarea
        value={personalStory}
        onChange={(e) => setPersonalStory(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md text-lg"
        rows={6}
      ></textarea>
      <div className="mt-4 flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 border border-gray-500 text-gray-700 rounded">
          Back
        </button>
        <button onClick={generateAIContent} className="px-4 py-2 bg-[#CA3C25] text-white rounded">
          Continue
        </button>
      </div>
    </div>
  );
}
