import { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface Props {
  location: string;
  setLocation: (value: string) => void;
  error: boolean;  // New error prop
}

const LocationInput: React.FC<Props> = ({ location, setLocation, error }) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        setLocation(place.formatted_address);
      }
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 md:px-6 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#223843]">
        Where’s the impact happening? 🌍
      </h1>
      <p className="text-gray-600 mb-4">
        Help others find and support your petition.
      </p>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Enter a city, state, or region
      </label>

      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search for a location..."
          className={`w-full px-4 py-3 border rounded-lg shadow-sm outline-none focus:ring-2 transition-all text-lg md:text-base ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-[#CA3C25]"
          }`}
        />
      </Autocomplete>

      {error && <p className="text-red-500 text-sm mt-1">Enter a location</p>}
    </div>
  );
};

export default LocationInput;
