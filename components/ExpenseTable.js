"use client";
import { format } from "date-fns";
import { formatCurrency } from "../lib/expenses";

export default function ExpenseTable({ expenses, onDelete }) {
  return (
    <div className="card">
      <div className="card-title">Transactions</div>
      <table className="table">
        <thead>
          <tr className="tr">
            <th className="th">Date</th>
            <th className="th">Description</th>
            <th className="th">Category</th>
            <th className="th" style={{textAlign:"right"}}>Amount</th>
            <th className="th" style={{width:80}}></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id} className="tr">
              <td className="td mono">{safeDate(e.date)}</td>
              <td className="td">{e.description}</td>
              <td className="td"><span className="badge">{e.category}</span></td>
              <td className="td mono" style={{textAlign:"right"}}>{formatCurrency(e.amount)}</td>
              <td className="td" style={{textAlign:"right"}}>
                <button className="button danger" onClick={()=>onDelete?.(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {expenses.length === 0 && (
            <tr className="tr"><td className="td" colSpan={5}><small className="help">No transactions match your filters.</small></td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function safeDate(d){
  try { return format(new Date(d), "yyyy-MM-dd"); } catch { return d; }
}
