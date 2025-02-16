"use client";
import { useState } from "react";
import AIPromptStep from "./AIPromptStep";
import AIPersonalStoryStep from "./AIPersonalStoryStep";
import AILoadingStep from "./AILoadingStep";
import AIReviewStep from "./AIReviewStep";

interface AIFormProps {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setStep: (step: number) => void;
}

export default function AIForm({ setTitle, setDescription, setStep }: AIFormProps) {
  const [aiStep, setAiStep] = useState(1);
  const [userPrompt, setUserPrompt] = useState("");
  const [personalStory, setPersonalStory] = useState("");
  // const [loading, setLoading] = useState(false);
  const [generatedTitle, setGeneratedTitle] = useState(""); // Store AI-generated title
  const [generatedDescription, setGeneratedDescription] = useState(""); // Store AI-generated description

  const removeMarkdown = (text: string) => {
    return text.replace(/\*\*/g, "").trim(); // Removes '**' and trims whitespace
  };

  const handleGenerateContent = async () => {
    // setLoading(true);
    setAiStep(3);
  
    try {
      const response = await fetch("/api/petitions/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompts: [
            `Generate a strong petition title based on this idea: ${userPrompt}`,
            `Write a compelling petition description for: ${userPrompt}. Include this personal story: ${personalStory}`,
          ],
        }),
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Debugging
  
      if (!data.responses || data.responses.length < 2) {
        throw new Error("Invalid API response: Title or Description missing");
      }
  
      // Extract Title from responses[0] and remove '**'
      const newTitle = removeMarkdown(data.responses[0].parts[0].text);
  
      // Extract Description from responses[1] and remove '**'
      const newDescription = removeMarkdown(data.responses[1].parts[0].text);
  
      console.log("Final Title:", newTitle);
      console.log("Final Description:", newDescription);
  
      setTitle(newTitle);
      setDescription(newDescription);
      setGeneratedTitle(newTitle);
      setGeneratedDescription(newDescription);
      setAiStep(4);
    } catch (err) {
      console.error("Error generating AI content:", err);
      setAiStep(2);
    } finally {
      // setLoading(false);
      console.log("frustating");
    }
  };

  return (
    <>
      {aiStep === 1 && (
        <AIPromptStep
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          nextStep={() => setAiStep(2)}
        />
      )}
      {aiStep === 2 && (
        <AIPersonalStoryStep
          personalStory={personalStory}
          setPersonalStory={setPersonalStory}
          prevStep={() => setAiStep(1)}
          generateAIContent={handleGenerateContent}
        />
      )}
      {aiStep === 3 && <AILoadingStep />}
      {aiStep === 4 && (
        <AIReviewStep
          title={generatedTitle} // ✅ Pass updated title without '**'
          setTitle={setGeneratedTitle}
          description={generatedDescription} // ✅ Pass updated description without '**'
          setDescription={setGeneratedDescription}
          prevStep={() => setAiStep(2)}
          confirmStep={() => {
            setTitle(generatedTitle); // ✅ Set final values
            setDescription(generatedDescription);
            setStep(6);
          }}
        />
      )}

      {/* Back button to return to Content Method Selection (Step 4) */}
      {aiStep === 1 && (
        <div className="mt-6 flex">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setStep(4)} // Go back to Content Method Selector
          >
            Back
          </button>
        </div>
      )}
    </>
  );
}
