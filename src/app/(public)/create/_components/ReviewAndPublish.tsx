import React, { useState } from "react";

interface Props {
  scope: string;
  location: string;
  category: string;
  title: string;
  description: string;
  image: File | string | null;
}

const ReviewAndPublish: React.FC<Props> = ({
  scope,
  location,
  category,
  title,
  description,
  image,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<string | null>(null);

  // Use ImageKit URL if image is already uploaded
  const imageUrl = typeof image === "string" ? image : null;

  // const submitPetition = async () => {
  //   if (!title || !description) {
  //     alert("Title and Description are required!");
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const response = await fetch("/api/post-petitions", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         scope,
  //         location,
  //         category,
  //         title,
  //         description,
  //         imageUrl,
  //       }),
  //     });

  //     const result = await response.json();
  //     console.log("Server Response:", result);
  //     setUploadResponse(result.message);

  //     if (response.ok) {
  //       alert("Petition submitted successfully!");
  //     } else {
  //       alert("Failed to submit petition.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting petition:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

const submitPetition = async () => {
  try {
    const response = await fetch("/api/post-petitions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scope,
        location,
        category,
        title,
        description,
        imageUrl, // ImageKit URL
      }),
    });

    const text = await response.text(); // Get raw response

    console.log("Raw Response:", text); // Debugging: See what the server sends

    if (!response.ok) {
      throw new Error(
        `Server Error: ${response.status} - ${response.statusText}`
      );
    }

    const data = JSON.parse(text); // Parse JSON manually
    console.log("Petition submitted successfully:", data);
  } catch (error) {
    console.error("Error submitting petition:", error);
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
          <p className="text-gray-700">
            {scope || (
              <span className="italic text-gray-500">Not specified</span>
            )}
          </p>
        </div>

        {location && (
          <div className="border-b pb-2">
            <p className="text-lg font-semibold text-[#CA3C25]">Location</p>
            <p className="text-gray-700">{location}</p>
          </div>
        )}

        <div className="border-b pb-2">
          <p className="text-lg font-semibold text-[#CA3C25]">Category</p>
          <p className="text-gray-700">
            {category || (
              <span className="italic text-gray-500">Not specified</span>
            )}
          </p>
        </div>
      </div>

      {/* Image Preview */}
      <div className="mt-6">
        {imageUrl ? (
          <img
            src={imageUrl}
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
            {title || (
              <span className="italic text-gray-500">No title provided</span>
            )}
          </p>
        </div>

        <div>
          <p className="text-lg font-semibold text-[#CA3C25]">Description</p>
          <p className="text-gray-700">
            {description || (
              <span className="italic text-gray-500">
                No description provided
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Submit Button */}
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

      {/* Response Message */}
      {uploadResponse && (
        <p className="mt-4 text-center text-green-600">{uploadResponse}</p>
      )}
    </div>
  );
};

export default ReviewAndPublish;
