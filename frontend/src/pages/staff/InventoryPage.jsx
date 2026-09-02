import { useState } from "react";
import { INVENTORY_ITEMS, getInventoryStatus } from "../../data/inventoryData";
import { useNotification } from "../../context/NotificationContext";
import { Package, AlertTriangle } from "lucide-react";
export default function InventoryPage() {
  const [inventory, setInventory] = useState(INVENTORY_ITEMS);
  const [editing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState("");
  const { addNotification } = useNotification();
  const lowCount = inventory.filter(i=>getInventoryStatus(i)==="low").length;
  const startEdit = (item) => { setEditing(item.id); setEditVal(String(item.quantity)); };
  const saveEdit = (id) => {
    const val = parseFloat(editVal);
    if (isNaN(val)||val<0) { addNotification({ type:"error", message:"Invalid quantity" }); return; }
    setInventory(prev=>prev.map(i=>i.id===id?{...i,quantity:val}:i));
    addNotification({ type:"success", message:"Inventory updated!" });
    setEditing(null);
  };
  const getColor = (item) => { const s=getInventoryStatus(item); return s==="low"?"#EF4444":s==="medium"?"#F59E0B":"#10B981"; };
  const getPct = (item) => Math.min(100,Math.round((item.quantity/item.maxLevel)*100));
  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>Inventory</h1><p>{inventory.length} ingredients tracked</p></div>
        <div className="sc-topbar-right">
          {lowCount>0 && <span className="sc-badge sc-badge-danger"><AlertTriangle size={12}/> {lowCount} low stock</span>}
          <span className="sc-demo-tag">🧪 DEMO</span>
        </div>
      </div>
      <div className="sc-page-content">
        {lowCount>0 && (
          <div className="sc-alert sc-alert-warning" style={{ marginBottom:24 }}>
            <AlertTriangle size={18}/>
            <div><strong>Low Stock Alert!</strong> {inventory.filter(i=>getInventoryStatus(i)==="low").map(i=>`${i.ingredient} (${i.quantity} ${i.unit})`).join(", ")} need to be restocked.</div>
          </div>
        )}
        <div className="sc-card">
          <div className="sc-card-header"><span className="sc-card-title"><Package size={16}/> Ingredient Stock</span></div>
          <div className="sc-table-wrapper">
            <table className="sc-table">
              <thead><tr><th>Ingredient</th><th>Category</th><th>Quantity</th><th>Level</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {inventory.map(item=>{
                  const status=getInventoryStatus(item);
                  const pct=getPct(item);
                  const color=getColor(item);
                  return (
                    <tr key={item.id} style={{ borderLeft: status==="low"?"3px solid var(--color-danger)":"" }}>
                      <td style={{ fontWeight:600 }}>{item.ingredient}</td>
                      <td style={{ color:"var(--text-muted)" }}>{item.category}</td>
                      <td>
                        {editing===item.id ? (
                          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                            <input className="sc-input" style={{ width:80, padding:"4px 8px" }} value={editVal} onChange={e=>setEditVal(e.target.value)} type="number" min={0} step={0.1}/>
                            <span style={{ color:"var(--text-muted)", fontSize:13 }}>{item.unit}</span>
                            <button className="sc-btn sc-btn-primary sc-btn-sm" onClick={()=>saveEdit(item.id)}>Save</button>
                            <button className="sc-btn sc-btn-ghost sc-btn-sm" onClick={()=>setEditing(null)}>✕</button>
                          </div>
                        ) : (
                          <span style={{ fontWeight:600, color }}>{item.quantity} {item.unit}</span>
                        )}
                      </td>
                      <td style={{ minWidth:120 }}>
                        <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:4 }}>{pct}% of max</div>
                        <div className="sc-stock-bar"><div className="sc-stock-fill" style={{ width:`${pct}%`, background:color }}/></div>
                      </td>
                      <td>
                        <span className={`sc-badge ${status==="low"?"sc-badge-danger":status==="medium"?"sc-badge-warning":"sc-badge-success"}`}>
                          {status==="low"?"⚠ Low":status==="medium"?"↓ Medium":"✓ OK"}
                        </span>
                      </td>
                      <td>
                        <button className="sc-btn sc-btn-outline sc-btn-sm" onClick={()=>startEdit(item)}>Edit</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
