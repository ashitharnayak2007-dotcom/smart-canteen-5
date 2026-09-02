import { useState } from "react";
import { MENU_ITEMS } from "../../data/menuData";
import { useNotification } from "../../context/NotificationContext";
import { Trash2 } from "lucide-react";
const REASONS = ["Overproduction","Cancelled orders","Expired","Low demand","Quality issues"];
const INIT = [
  { id:1, item:"Veg Rice",    qty:3.2, unit:"kg",  date:"2026-09-01", reason:"Overproduction" },
  { id:2, item:"Idli",        qty:15,  unit:"pcs",  date:"2026-09-01", reason:"Low demand" },
  { id:3, item:"Masala Dosa", qty:8,   unit:"pcs",  date:"2026-09-01", reason:"Cancelled orders" },
];
export default function WastageEntry() {
  const [records, setRecords] = useState(INIT);
  const [form, setForm] = useState({ item:"", qty:"", unit:"kg", reason:"Overproduction" });
  const { addNotification } = useNotification();
  const upd = f => e => setForm(p=>({...p,[f]:e.target.value}));
  const submit = e => {
    e.preventDefault();
    if (!form.item||!form.qty) return;
    setRecords(prev=>[{ id:Date.now(), ...form, qty:parseFloat(form.qty), date:new Date().toISOString().slice(0,10) }, ...prev]);
    setForm({ item:"", qty:"", unit:"kg", reason:"Overproduction" });
    addNotification({ type:"info", message:"Wastage recorded successfully" });
  };
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>Record Wastage</h1><p>Log food that could not be served</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO</span></div>
      </div>
      <div className="sc-page-content">
        <div className="sc-grid-2" style={{ gap:24, alignItems:"start" }}>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title"><Trash2 size={16}/> New Wastage Entry</span></div>
            <div className="sc-card-body">
              <form onSubmit={submit}>
                <div className="sc-form-group">
                  <label className="sc-label">Food Item</label>
                  <select className="sc-select" value={form.item} onChange={upd("item")} required>
                    <option value="">Select item...</option>
                    {MENU_ITEMS.map(m=><option key={m.id} value={m.name}>{m.emoji} {m.name}</option>)}
                  </select>
                </div>
                <div style={{ display:"flex", gap:12 }}>
                  <div className="sc-form-group" style={{ flex:2 }}>
                    <label className="sc-label">Quantity Wasted</label>
                    <input className="sc-input" type="number" min="0" step="0.1" placeholder="e.g. 3.5" value={form.qty} onChange={upd("qty")} required/>
                  </div>
                  <div className="sc-form-group" style={{ flex:1 }}>
                    <label className="sc-label">Unit</label>
                    <select className="sc-select" value={form.unit} onChange={upd("unit")}>
                      {["kg","L","pcs","plates"].map(u=><option key={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                <div className="sc-form-group">
                  <label className="sc-label">Reason</label>
                  <select className="sc-select" value={form.reason} onChange={upd("reason")}>
                    {REASONS.map(r=><option key={r}>{r}</option>)}
                  </select>
                </div>
                <button className="sc-btn sc-btn-danger sc-btn-full" type="submit"><Trash2 size={16}/> Record Wastage</button>
              </form>
            </div>
          </div>
          <div className="sc-card">
            <div className="sc-card-header"><span className="sc-card-title">Recent Wastage Log</span></div>
            <div className="sc-table-wrapper">
              <table className="sc-table">
                <thead><tr><th>Date</th><th>Item</th><th>Qty</th><th>Reason</th></tr></thead>
                <tbody>
                  {records.map(r=>(
                    <tr key={r.id}>
                      <td style={{ color:"var(--text-muted)", fontSize:13 }}>{r.date}</td>
                      <td style={{ fontWeight:600 }}>{r.item}</td>
                      <td style={{ color:"var(--color-danger)" }}>{r.qty} {r.unit}</td>
                      <td><span className="sc-badge sc-badge-warning">{r.reason}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
