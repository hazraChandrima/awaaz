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
import ImageUpload from "./_components/ImageUpload";
import Loading from "@/app/components/loading/Loading";

export default function CreatePetitionPage() {
  const [step, setStep] = useState<number>(1);
  const [scope, setScope] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [method, setMethod] = useState<"manual" | "ai" | "">("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<boolean>(false);
  const goal = 100;
  const [loading, setLoading] = useState<boolean>(true);

  const handleNextStep = () => {
    if (step === 2 && !location.trim() && scope !== "Global") {
      setLocationError(true);
      return;
    }
    setLocationError(false);

    if (step === 5 && method === "ai") return;

    if (step === 6) {
      setStep(7);
      return;
    }

    setStep((prev) =>
      prev === 1 && scope === "Global" ? 3 : Math.min(prev + 1, 7)
    );
  };

  const handlePrevStep = () => {
    if (step === 5 && method === "ai") return;
    setStep((prev) =>
      prev === 3 && scope === "Global" ? 1 : Math.max(prev - 1, 1)
    );
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
      onLoad={() => setLoading(false)}
      onError={() => setLoading(false)}
    >
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full p-6 bg-white mt-28">
          <div className="mb-6 text-center">
            <p className="text-lg font-semibold">Step {step} of 7</p>
            <div className="my-10 h-2 w-full bg-gray-200 rounded">
              <div
                className="h-2 bg-[#CA3C25] rounded transition-all"
                style={{ width: `${(step / 7) * 100}%` }}
              ></div>
            </div>

            {step === 1 && (
              <ScopeSelector
                scope={scope}
                setScope={(val: string) => {
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
                image={uploadedImageUrl}
                userId="123456"
                goal={goal}
              />
            )}

            {step !== 5 && (
              <div className="mt-6 flex justify-center space-x-4">
                {step > 1 && (
                  <button
                    className="py-2 px-4 rounded border-2 border-[#CA3C25] text-[#CA3C25] hover:bg-[#CA3C25] hover:text-white bg-transparent transition duration-300 ease-in-out transform focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                    onClick={handlePrevStep}
                  >
                    Back
                  </button>
                )}
                {step < 7 && (
                  <button
                    className="px-4 py-2 bg-[#ca3c25] text-white rounded hover:bg-[#b13521] transition duration-300 ease-in-out transform"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </LoadScript>
  );
}
