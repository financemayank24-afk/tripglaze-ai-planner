import React from "react";

export default function ItineraryCard({day}) {
  return (
    <div style={{
      display:"flex", gap:16, background:"#fff", padding:16, borderRadius:12, boxShadow:"0 6px 18px rgba(20,20,30,0.06)"
    }}>
      <div style={{minWidth:64, textAlign:"center"}}>
        <div style={{background:"#2f6f7f", color:"#fff", width:48, height:48, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700}}>
          {day.day}
        </div>
        <div style={{fontSize:12, color:"#666", marginTop:8}}>{day.date}</div>
      </div>

      <div style={{flex:1}}>
        <h4 style={{margin:0, fontSize:18, color:"#123"}}>{day.title}</h4>
        <p style={{margin:"8px 0 0", color:"#444"}}>{day.description}</p>
        <ul style={{paddingLeft:18, marginTop:8}}>
          {day.activities?.map((a,i) => <li key={i}>{a}</li>)}
        </ul>
      </div>
    </div>
  );
}
