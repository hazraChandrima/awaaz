// app/api/geolocation/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 });
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.status !== "OK" || data.results.length === 0) {
      return NextResponse.json({ error: "Location not found" }, { status: 404 });
    }

    const city = data.results[0].address_components.find((comp: any) =>
      comp.types.includes("locality")
    )?.long_name;
    const state = data.results[0].address_components.find((comp: any) =>
      comp.types.includes("administrative_area_level_1")
    )?.long_name;

    return NextResponse.json({ city: city || "Unknown", state: state || "Unknown" });
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
