import React from "react";

export default function MapPreview({points=[]}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (!apiKey || !points.length) return null;

  const base = "https://maps.googleapis.com/maps/api/staticmap";
  const size = "800x300";

  const markers = points
    .map((p,i) => {
      const label = encodeURIComponent(p.label || String(i+1));
      return `markers=label:${label}|${encodeURIComponent(p.lat + "," + p.lng)}`;
    })
    .join("&");

  const path = points.length > 1
    ? `&path=weight:3|color:0x2f6f7f|${points.map(p=>`${p.lat},${p.lng}`).join("|`)}`
    : "";

  const url = `${base}?${markers}&size=${size}${path}&key=${apiKey}`;

  return (
    <div style={{marginTop:16}}>
      <img src={url} alt="Map preview" style={{width:"100%", borderRadius:8}} />
    </div>
  );
}
