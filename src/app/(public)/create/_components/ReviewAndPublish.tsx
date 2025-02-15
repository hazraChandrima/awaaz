import { auth } from "@/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

interface Props {
  scope: string;
  location: string;
  category: string;
  title: string;
  description: string;
  image: string | null;
  userId: string;
  goal: number;
}

const ReviewAndPublish: React.FC<Props> = ({
  scope,
  location,
  category,
  title,
  description,
  image,
  goal,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user); 
        } else {
          setCurrentUser(null);
        }
      });
  
      return () => unsubscribe();
    }, []);

  const submitPetition = async () => {
    const missingFields = [];
    if (!title) missingFields.push("Title");
    if (!description) missingFields.push("Description");
    if (!scope) missingFields.push("Scope");
    if (!goal) missingFields.push("Goal");

    if (missingFields.length > 0) {
      alert(`⚠️ Missing required fields: ${missingFields.join(", ")}`);
      return;
    }

    if (!currentUser){
      alert(`⚠️ User is not authenticated`);
      return;
    }
    setIsSubmitting(true);
    setUploadResponse(null);

    const petitionData = {
      title,
      description,
      image_url: image,
      category,
      scope,
      userId: currentUser.uid,
      location,
      goal,
    };

    console.log("📤 Sending petition data:", petitionData);

    try {
      const response = await fetch("/api/post-petitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petitionData),
      });

      if (!response.ok) {
        throw new Error(
          `Server Error: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("✅ Successfully posted request to DB:", data);

      setUploadResponse("✅ Petition submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting petition:", error);
      setUploadResponse("❌ Failed to submit petition. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-[#223843] mb-4">
        Review Your Petition
      </h2>
      <p className="text-gray-600 mb-4">
        Double-check the details before publishing.
      </p>

      <div className="space-y-3">
        <div className="border-b pb-2">
          <p className="text-lg font-semibold text-[#CA3C25]">Scope</p>
          <p className="text-gray-700">{scope || "Not specified"}</p>
        </div>

        {location && (
          <div className="border-b pb-2">
            <p className="text-lg font-semibold text-[#CA3C25]">Location</p>
            <p className="text-gray-700">{location}</p>
          </div>
        )}

        <div className="border-b pb-2">
          <p className="text-lg font-semibold text-[#CA3C25]">Category</p>
          <p className="text-gray-700">{category || "Not specified"}</p>
        </div>
      </div>

      <div className="mt-6">
        {image ? (
          <img
            src={image}
            alt="Petition Preview"
            className="mt-2 rounded-lg shadow-md border border-gray-300 w-full object-cover max-h-80"
          />
        ) : (
          <p className="text-gray-500 italic mt-1 text-center">
            No image uploaded
          </p>
        )}
      </div>

      <div className="mt-4 space-y-3">
        <div className="border-b pb-2">
          <p className="text-lg font-semibold text-[#CA3C25]">Title</p>
          <p className="text-gray-800 font-bold">
            {title || "No title provided"}
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold text-[#CA3C25]">Description</p>
          <p className="text-gray-700">
            {description || "No description provided"}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className={`px-6 py-3 bg-[#CA3C25] text-white font-semibold rounded-lg shadow-md transition duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
          onClick={submitPetition}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing..." : "🚀 Publish Petition"}
        </button>
      </div>

      {uploadResponse && (
        <p className="mt-4 text-center text-green-600">{uploadResponse}</p>
      )}
    </div>
  );
};

export default ReviewAndPublish;
