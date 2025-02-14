"use client";

import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import ScopeSelector from "./_components/ScopeSelector";
import LocationInput from "./_components/LocationInput";
import CategorySelector from "./_components/CategorySelector";
import ContentMethodSelector from "./_components/ContentMethodSelector";
import ManualForm from "./_components/ManualForm";
import ReviewAndPublish from "./_components/ReviewAndPublish";

export default function CreatePetitionPage() {
  const [step, setStep] = useState(1);
  const [scope, setScope] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState<"manual" | "ai" | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [locationError, setLocationError] = useState(false); // Track location error state

  const handleNextStep = () => {
    if (step === 2 && !location.trim()) {
      // If location is empty at step 2, show error
      setLocationError(true);
    } else {
      // Proceed to the next step
      setLocationError(false); // Reset error
      setStep((prev) => {
        if (prev === 1 && scope === "Global") return 3;
        return Math.min(prev + 1, 6); // Navigate to next step
      });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      <div className="bg-[#E8EBE4] text-[#223843]">
        <div className="w-full p-6 bg-white shadow-lg">
          {/* Step Indicator */}
          <div className="mb-20 text-center">
            <p className="text-lg font-semibold">Step {step} of 6</p>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded">
              <div
                className="h-2 bg-[#CA3C25] rounded transition-all"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Steps */}
          <div className="">
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
              <LocationInput
                location={location}
                setLocation={setLocation}
                error={locationError} // Pass error prop to LocationInput component
              />
            )}
            {step === 3 && <CategorySelector category={category} setCategory={setCategory} />}
            {step === 4 && <ContentMethodSelector method={method} setMethod={setMethod} />}
            {step === 5 && method === "manual" && (
              <ManualForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                image={image}
                setImage={setImage}
              />
            )}
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
          </div>

          {/* Navigation Buttons (Centered) */}
          <div className="mt-10 flex justify-center gap-4">
            <button
              className={`px-4 py-2 bg-[#223843] text-white rounded ${
                step === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() =>
                setStep((prev) => {
                  if (prev === 3 && scope === "Global") return 1;
                  return Math.max(prev - 1, 1);
                })
              }
              disabled={step === 1}
            >
              Prev
            </button>

            <button
              className="px-4 py-2 bg-[#CA3C25] text-white rounded hover:bg-[#A83220] transition"
              onClick={handleNextStep} // Call handleNextStep on click
            >
              {step === 6 ? "Publish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </LoadScript>
  );
}
