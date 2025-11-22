"use client";

export default function Filters({ q, setQ, category, setCategory, startDate, setStartDate, endDate, setEndDate, categories }){
  const catOptions = ["All", ...Array.from(new Set([...(categories||[])]))];
  return (
    <div className="card">
      <div className="card-title">Filters</div>
      <div className="input-row" style={{gridTemplateColumns:"1fr 1fr 1fr 1fr", marginBottom:12}}>
        <input className="input" placeholder="Search" value={q} onChange={(e)=>setQ(e.target.value)} />
        <select className="select" value={category} onChange={(e)=>setCategory(e.target.value)}>
          {catOptions.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="input" type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
        <input className="input" type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} />
      </div>
      <div className="footer-actions">
        <button className="button secondary" onClick={()=>{setQ("");setCategory("All");setStartDate("");setEndDate("");}}>Reset</button>
      </div>
    </div>
  );
}
