import React, { useState } from "react";
import TripForm from "../components/TripForm";
import Spinner from "../components/Spinner";
import ItineraryCard from "../components/ItineraryCard";
import MapPreview from "../components/MapPreview";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [mapPoints, setMapPoints] = useState([]);

  async function handleGenerate(formValues) {
    try {
      setIsLoading(true);
      setItinerary(null);
      setMapPoints([]);

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(formValues)
      });

      if (!res.ok) throw new Error("Failed to generate itinerary");
      const data = await res.json();
      setItinerary(data);
      if (data.points) setMapPoints(data.points);
    } catch (err) {
      console.error(err);
      alert("Error generating itinerary. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{maxWidth:900, margin:"0 auto", padding:"24px 16px 64px"}}>
      <h1 style={{textAlign:"center", color:"#123"}}>TripGlaze - AI Trip Planner</h1>
      <p style={{textAlign:"center", color:"#666", marginBottom: 32}}>Create personalized itineraries in seconds</p>
      <div style={{marginTop:24}}>
        <TripForm onSubmit={handleGenerate} disabled={isLoading} />
      </div>
      <div style={{marginTop:24}}>
        {isLoading && <Spinner />}
        {!isLoading && itinerary && (
          <>
            <MapPreview points={mapPoints} />
            <div style={{display:"flex", flexDirection:"column", gap:16, marginTop:24}}>
              {itinerary.days?.map((day) => (
                <ItineraryCard key={day.day} day={day} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
