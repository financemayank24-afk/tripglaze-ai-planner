import React, {useState} from "react";

export default function TripForm({ onSubmit, disabled }) {
  const [destination, setDestination] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [style, setStyle] = useState("Relaxed");
  const [budget, setBudget] = useState("Medium");

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({destination,start,end,style,budget}); }}>
      <div style={{display:"grid", gap:12, gridTemplateColumns:"1fr 1fr"}}>
        <input
          required
          placeholder="Destination (city or region)"
          value={destination}
          onChange={e=>setDestination(e.target.value)}
          disabled={disabled}
          style={{padding: "10px 12px", borderRadius: 6, border: "1px solid #ddd", fontSize: 14}}
        />
        <select value={style} onChange={e=>setStyle(e.target.value)} disabled={disabled} style={{padding: "10px 12px", borderRadius: 6, border: "1px solid #ddd", fontSize: 14}}>
          <option>Relaxed</option>
          <option>Balanced</option>
          <option>Active</option>
          <option>Roadtrip</option>
        </select>

        <input type="date" value={start} onChange={e=>setStart(e.target.value)} required disabled={disabled} style={{padding: "10px 12px", borderRadius: 6, border: "1px solid #ddd", fontSize: 14}} />
        <input type="date" value={end} onChange={e=>setEnd(e.target.value)} required disabled={disabled} style={{padding: "10px 12px", borderRadius: 6, border: "1px solid #ddd", fontSize: 14}} />

        <select value={budget} onChange={e=>setBudget(e.target.value)} disabled={disabled} style={{padding: "10px 12px", borderRadius: 6, border: "1px solid #ddd", fontSize: 14}}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <div />
      </div>

      <div style={{marginTop:12}}>
        <button
          type="submit"
          style={{padding:"10px 18px", background:"#2f6f7f", color:"#fff", borderRadius:8, border:"none", cursor: "pointer", fontSize: 14, fontWeight: 600}}
          disabled={disabled}
        >
          {disabled ? "Generating..." : "Generate Itinerary"}
        </button>
      </div>
    </form>
  );
}
