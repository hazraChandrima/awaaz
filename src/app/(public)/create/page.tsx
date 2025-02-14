"use client";

import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import ScopeSelector from "./_components/ScopeSelector";
import LocationInput from "./_components/LocationInput";
import CategorySelector from "./_components/CategorySelector";
import ContentMethodSelector from "./_components/ContentMethodSelector";
import ManualForm from "./_components/manual-steps/ManualForm";
import ReviewAndPublish from "./_components/ReviewAndPublish";
import AIForm from "./_components/ai-steps/AIForm";

export default function CreatePetitionPage() {
  const [step, setStep] = useState(1);
  const [scope, setScope] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState<"manual" | "ai" | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [locationError, setLocationError] = useState(false);

  const handleNextStep = () => {
    if (step === 2 && !location.trim() && scope !== "Global") {
      setLocationError(true);
      return;
    }
    setLocationError(false);

    if (step === 5 && method === "ai") return; // AI steps are handled separately

    setStep((prev) => (prev === 1 && scope === "Global" ? 3 : Math.min(prev + 1, 6)));
  };

  const handlePrevStep = () => {
    if (step === 5 && method === "ai") return; // AI steps handled in AIForm

    setStep((prev) => (prev === 3 && scope === "Global" ? 1 : Math.max(prev - 1, 1)));
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={["places"]}>
      <div className="bg-[#E8EBE4] text-[#223843]">
      <div className="w-full p-6 bg-white shadow-lg">
          <div className="mb-6 text-center">
            <p className="text-lg font-semibold">Step {step} of 6</p>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded">
              <div className="h-2 bg-[#CA3C25] rounded transition-all" style={{ width: `${(step / 6) * 100}%` }}></div>
            </div>
          </div>

          {/* Form Steps */}
          {step === 1 && (
            <ScopeSelector
              scope={scope}
              setScope={(val) => {
                setScope(val);
                if (val === "Global") setStep(3);
              }}
            />
          )}
          {step === 2 && scope !== "Global" && (
            <LocationInput location={location} setLocation={setLocation} error={locationError} />
          )}
          {step === 3 && <CategorySelector category={category} setCategory={setCategory} />}
          {step === 4 && <ContentMethodSelector method={method} setMethod={setMethod} />}
          {step === 5 && method === "ai" && <AIForm setTitle={setTitle} setDescription={setDescription} setStep={setStep} />}
          {step === 5 && method === "manual" && <ManualForm setTitle={setTitle} setDescription={setDescription} setStep={setStep} />}
          {step === 6 && (
            <ReviewAndPublish
              scope={scope}
              location={location}
              category={category}
              title={title}
              description={description}
              image={image}
              submitPetition={() => alert("Petition Published!")}
            />
          )}

          {/* Navigation Buttons (Hidden in ManualForm steps) */}
          {!(step === 5 && method === "manual") && (
            <div className="mt-6 flex justify-between">
              {step > 1 && (
                <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={handlePrevStep}>
                  Back
                </button>
              )}
              <button className="px-4 py-2 bg-[#CA3C25] text-white rounded" onClick={handleNextStep}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
}
