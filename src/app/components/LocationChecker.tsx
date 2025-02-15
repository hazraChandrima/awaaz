import { useEffect, useState } from "react";

const LocationChecker = () => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch('/api/get-user-location');
        const data = await response.json();
        setIsAllowed(data.isAllowed);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
    fetchLocation();
  }, []);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  return isAllowed ? (
    <div className="text-green-500">You are in a valid region to sign this petition.</div>
  ) : (
    <div className="text-red-500">You are not in a valid region to sign this petition.</div>
  );
};

export default LocationChecker;
