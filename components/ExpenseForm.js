"use client";
import { useState } from "react";
import { normalizeExpense } from "../lib/expenses";

const DEFAULT_CATEGORIES = ["General","Groceries","Dining","Transport","Housing","Utilities","Health","Entertainment","Travel","Education","Gifts"];

export default function ExpenseForm({ onAdd, categories }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const allCats = Array.from(new Set([...(categories || []), ...DEFAULT_CATEGORIES]));

  function handleSubmit(e){
    e.preventDefault();
    if (!description.trim() || !amount) return;
    const exp = normalizeExpense({ date, description, category, amount, notes });
    onAdd?.(exp);
    setDescription("");
    setAmount("");
    setNotes("");
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="card-title">Add Expense</div>
      <div className="input-row" style={{marginBottom:12}}>
        <input className="input" type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
        <input className="input" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
        <select className="select" value={category} onChange={(e)=>setCategory(e.target.value)}>
          {allCats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="input" type="number" step="0.01" min="0" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} />
      </div>
      <div className="row" style={{justifyContent:"space-between"}}>
        <input className="input" style={{flex:1}} placeholder="Notes (optional)" value={notes} onChange={(e)=>setNotes(e.target.value)} />
        <button className="button" type="submit">Add</button>
      </div>
    </form>
  );
}
