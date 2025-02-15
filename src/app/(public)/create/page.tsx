"use client";

import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import ScopeSelector from "./_components/ScopeSelector";
import LocationInput from "./_components/LocationInput";
import CategorySelector from "./_components/CategorySelector";
import ContentMethodSelector from "./_components/ContentMethodSelector";
import ManualForm from "./_components/manual-steps/ManualForm";
import ReviewAndPublish from "./_components/ReviewAndPublish";
import AIForm from "./_components/ai-steps/AIForm";
import ImageUpload from "./_components/ImageUpload";

export default function CreatePetitionPage() {
  const [step, setStep] = useState<number | null>(null);
  const [scope, setScope] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState<"manual" | "ai" | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [goal, setGoal] = useState(1000); // Default petition goal
  const [loading, setLoading] = useState(true); // Ensure loader appears immediately

  useEffect(() => {
    // Show loading animation immediately
    setTimeout(() => {
      setLoading(false); // Hide loader
      setStep(1); // Then show step 1
    }, 1500);
  }, []);

  const handleNextStep = () => {
    if (step === 2 && !location.trim() && scope !== "Global") {
      setLocationError(true);
      return;
    }
    setLocationError(false);

    if (step === 5 && method === "ai") return;

    if (step === 6) {
      setStep(7); // Proceed to review even if no image uploaded
      return;
    }

    setStep((prev) =>
      prev === 1 && scope === "Global" ? 3 : Math.min(prev! + 1, 7)
    );
  };

  const handlePrevStep = () => {
    if (step === 5 && method === "ai") return;
    setStep((prev) =>
      prev === 3 && scope === "Global" ? 1 : Math.max(prev! - 1, 1)
    );
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      <div className="w-full p-6 bg-white shadow-lg">
            <div className="mb-6 text-center">


          {/* Loader */}
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="mt-10 w-12 h-12 border-4 border-[#CA3C25] border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-10 text-lg font-semibold text-[#223843]">Loading...</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <p className="text-lg font-semibold">Step {step} of 7</p>
                <div className="mt-2 h-2 w-full bg-gray-200 rounded">
                  <div
                    className="h-2 bg-[#CA3C25] rounded transition-all"
                    style={{ width: `${(step! / 7) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step Components */}
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
                  error={locationError}
                />
              )}
              {step === 3 && (
                <CategorySelector category={category} setCategory={setCategory} />
              )}
              {step === 4 && (
                <ContentMethodSelector method={method} setMethod={setMethod} />
              )}
              {step === 5 && method === "ai" && (
                <AIForm
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setStep={setStep}
                />
              )}
              {step === 5 && method === "manual" && (
                <ManualForm
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setStep={setStep}
                />
              )}
              {step === 6 && (
                <ImageUpload
                  image={image}
                  setImage={setImage}
                  setUploadedImageUrl={setUploadedImageUrl}
                />
              )}
              {step === 7 && (
                <ReviewAndPublish
                  scope={scope}
                  location={location}
                  category={category}
                  title={title}
                  description={description}
                  image={uploadedImageUrl} // ✅ Ensure uploaded image URL is passed
                  userId="123456" // Replace with actual user ID logic
                  goal={goal}
                />
              )}

              {/* Navigation Buttons */}
              {step !== 5 && (
                <div className="mt-6 flex justify-between">
                  {step > 1 && (
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded"
                      onClick={handlePrevStep}
                    >
                      Back
                    </button>
                  )}
                  <button
                    className="px-4 py-2 bg-[#1d1b1a] text-white rounded"
                    onClick={handleNextStep}
                  >
                    {step === 7 ? "Publish" : "Next"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </LoadScript>
  );
}
