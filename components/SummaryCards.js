"use client";
import { format } from "date-fns";
import { sumAmount, formatCurrency } from "../lib/expenses";

export default function SummaryCards({ allExpenses, filteredExpenses }){
  const totalAll = sumAmount(allExpenses);
  const totalFiltered = sumAmount(filteredExpenses);
  const monthKey = format(new Date(), "yyyy-MM");
  const totalThisMonth = sumAmount(allExpenses.filter(e => (e.date||"").startsWith(monthKey)));
  return (
    <div className="kpis">
      <div className="kpi"><div className="label">Total (All)</div><div className="value mono">{formatCurrency(totalAll)}</div></div>
      <div className="kpi"><div className="label">Total (Filtered)</div><div className="value mono">{formatCurrency(totalFiltered)}</div></div>
      <div className="kpi"><div className="label">This Month</div><div className="value mono">{formatCurrency(totalThisMonth)}</div></div>
      <div className="kpi"><div className="label">Transactions</div><div className="value mono">{filteredExpenses.length}</div></div>
    </div>
  );
}
