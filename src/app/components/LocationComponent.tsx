"use client";
import React, { useEffect, useState } from "react";

interface AddressComponent {
  long_name: string;
  types: string[];
}

const TestPage: React.FC = () => {
  const [locationData, setLocationData] = useState<{
    city: string;
    state: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);

          try {
            const apiKey = "AIzaSyCBdGJEYz3uAcNDwrOv19nXXQVwlVBxxUU"; // Replace with your Google Maps API key
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const data = await response.json();
            if (data.status === "OK" && data.results.length > 0) {
              const city = data.results[0].address_components.find(
                (component: AddressComponent) =>
                  component.types.includes("locality")
              )?.long_name;
              const state = data.results[0].address_components.find(
                (component: AddressComponent) =>
                  component.types.includes("administrative_area_level_1")
              )?.long_name;
              setLocationData({
                city: city || "Unknown",
                state: state || "Unknown",
              });
            } else {
              setError("Could not find location data.");
            }
          } catch (err) {
            setError("Error fetching location details.");
            console.error(err);
          }
        },
        (err) => {
          console.error("Error fetching location:", err);
          setError("Error fetching location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold">Test Page</h1>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {locationData ? (
        <div className="mt-4">
          <p className="text-lg">City: {locationData.city}</p>
          <p className="text-lg">State: {locationData.state}</p>
        </div>
      ) : (
        <p className="mt-4 text-lg">Fetching location...</p>
      )}
    </div>
  );
};

export default TestPage;
