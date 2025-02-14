"use client";

import { useState } from "react";
import ManualTitle from "./ManualTitle";
import ManualDescription from "./ManualDescription";

interface ManualFormProps {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setStep: (step: number) => void;
}

export default function ManualForm({ setTitle, setDescription, setStep }: ManualFormProps) {
  const [manualStep, setManualStep] = useState(1);
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");

  return (
    <>
      {/* Step 1: Enter Petition Title */}
      {manualStep === 1 && (
        <ManualTitle 
          title={localTitle} 
          setTitle={setLocalTitle} 
          nextStep={() => {
            if (localTitle.trim()) {
              setTitle(localTitle);  // Update global title state
              setManualStep(2);      // Move to step 2
            }
          }} 
          prevStep={() => setStep(4)} // Go back to Content Method Selection
        />
      )}

      {/* Step 2: Enter Petition Description */}
      {manualStep === 2 && (
        <ManualDescription 
          description={localDescription} 
          setDescription={setLocalDescription} 
          prevStep={() => setManualStep(1)} 
          confirmStep={() => {
            if (localDescription.trim()) {
              setDescription(localDescription); // Update global description state
              setStep(6);  // Move to ReviewAndPublish
            }
          }} 
        />
      )}
    </>
  );
}
