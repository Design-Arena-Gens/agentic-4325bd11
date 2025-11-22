"use client";
import { useEffect, useMemo, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import Filters from "../components/Filters";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import { loadExpenses, saveExpenses } from "../lib/storage";
import { filterExpenses, groupByCategory, groupByMonth, sumAmount, formatCurrency } from "../lib/expenses";

export default function Page(){
  const [expenses, setExpenses] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => { setExpenses(loadExpenses().sort((a,b)=> b.date.localeCompare(a.date))); }, []);
  useEffect(() => { saveExpenses(expenses); }, [expenses]);

  const categories = useMemo(() => Array.from(new Set(expenses.map(e => e.category))).sort(), [expenses]);
  const filtered = useMemo(() => filterExpenses(expenses, { q, category, startDate, endDate }), [expenses, q, category, startDate, endDate]);

  function handleAdd(exp){ setExpenses(prev => [exp, ...prev]); }
  function handleDelete(id){ setExpenses(prev => prev.filter(e => e.id !== id)); }

  function exportCsv(){
    const rows = [["id","date","description","category","amount","notes"], ...filtered.map(e => [e.id,e.date,escapeCsv(e.description),escapeCsv(e.category),e.amount,escapeCsv(e.notes)])];
    const blob = new Blob([rows.map(r=>r.join(",")).join("\n")], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `expenses_export_${Date.now()}.csv`; a.click(); URL.revokeObjectURL(url);
  }

  const byMonth = useMemo(()=> groupByMonth(filtered), [filtered]);
  const byCategory = useMemo(()=> groupByCategory(filtered), [filtered]);

  return (
    <div className="container">
      <div className="header">
        <div>
          <div className="app-title">Expense Dashboard</div>
          <div className="subtle">Your data is stored locally in this browser.</div>
        </div>
        <div className="row">
          <button className="button secondary" onClick={exportCsv}>Export CSV</button>
        </div>
      </div>

      <div className="grid">
        <div>
          <ExpenseForm onAdd={handleAdd} categories={categories} />
          <div className="card" style={{marginTop:16}}>
            <div className="card-title">Overview</div>
            <SummaryCards allExpenses={expenses} filteredExpenses={filtered} />
            <hr className="sep" />
            <div className="row" style={{justifyContent:"space-between"}}>
              <div><small className="help">Filtered total</small><div className="mono" style={{fontSize:18,fontWeight:700}}>{formatCurrency(sumAmount(filtered))}</div></div>
              <div className="row" style={{gap:8}}>
                <span className="badge">{filtered.length} items</span>
              </div>
            </div>
          </div>
          <div style={{marginTop:16}}>
            <ExpenseTable expenses={filtered} onDelete={handleDelete} />
          </div>
        </div>
        <div>
          <Filters q={q} setQ={setQ} category={category} setCategory={setCategory} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} categories={categories} />
          <div style={{marginTop:16}}>
            <Charts byMonth={byMonth} byCategory={byCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}

function escapeCsv(v){
  const s = String(v ?? "");
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return '"' + s.replaceAll('"','""') + '"';
  }
  return s;
}
