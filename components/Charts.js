"use client";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { monthLabel } from "../lib/expenses";

export default function Charts({ byMonth, byCategory }){
  const monthData = {
    labels: byMonth.map(m => monthLabel(m.month)),
    datasets: [{
      label: "Monthly Spend",
      data: byMonth.map(m => m.total),
      backgroundColor: "rgba(110,168,254,0.5)",
      borderColor: "#6ea8fe"
    }]
  };
  const catData = {
    labels: byCategory.map(c => c.category),
    datasets: [{
      label: "By Category",
      data: byCategory.map(c => c.total),
      backgroundColor: ["#6ea8fe","#7ee7d6","#ffb86b","#ff6b6b","#c17dff","#a0d911","#36cfc9","#fa8c16","#9254de","#13c2c2"]
    }]
  };
  return (
    <div className="grid" style={{gap:16}}>
      <div className="card"><div className="card-title">Monthly</div><Bar data={monthData} options={{ plugins:{legend:{labels:{color:'#e6ecff'}}}, scales:{x:{ticks:{color:'#8fa3d6'}}, y:{ticks:{color:'#8fa3d6'}}}}} /></div>
      <div className="card"><div className="card-title">By Category</div><Doughnut data={catData} options={{ plugins:{legend:{labels:{color:'#e6ecff'}}}}} /></div>
    </div>
  );
}
