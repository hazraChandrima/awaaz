"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ManualTitle from "./ManualTitle";

// ✅ Prevent SSR issues by dynamically loading ManualDescription
const ManualDescription = dynamic(() => import("./ManualDescription"), { ssr: false });

interface ManualFormProps {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void; // 🔹 Ensure description is a string
  setStep: (step: number) => void;
}

export default function ManualForm({ setTitle, setDescription, setStep }: ManualFormProps) {
  const [manualStep, setManualStep] = useState(1);
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState(""); // 🔹 Ensure it's a string

  const handleTitleNext = () => {
    if (!localTitle.trim()) return;
    setTitle(localTitle);
    setManualStep(2);
  };

  const handleDescriptionConfirm = () => {
    if (!localDescription.trim()) return;
    setDescription(localDescription);
    setStep(6); // Move to ReviewAndPublish
  };

  return (
    <>
      {/* Step 1: Enter Petition Title */}
      {manualStep === 1 && (
        <ManualTitle
          title={localTitle}
          setTitle={setLocalTitle}
          nextStep={handleTitleNext}
          prevStep={() => setStep(4)} // Back to Content Method Selection
        />
      )}

      {/* Step 2: Enter Petition Description */}
      {manualStep === 2 && (
        <ManualDescription
          description={localDescription} // 🔹 Pass string
          setDescription={setLocalDescription} // 🔹 Accept string
          prevStep={() => setManualStep(1)}
          confirmStep={handleDescriptionConfirm}
        />
      )}
    </>
  );
}
