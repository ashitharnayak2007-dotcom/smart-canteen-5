import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User } from "lucide-react";

const DEMO_RESPONSES = {
  "masala dosa": "Based on historical data and today's predictions, you should prepare **72 Masala Dosas**. Demand is trending up 12% vs last week. Peak demand is between 8:00–9:30 AM.",
  "wastage": "The item with highest wastage this week is **Veg Rice** (3.2 kg wasted). Main reason: Overproduction on Monday and Wednesday. Recommendation: Reduce Monday preparation by 15%.",
  "busy": "The busiest lunch hour is **12:30 PM – 1:00 PM** with an average of 52 orders per day. Friday afternoons see the highest traffic overall.",
  "friday": "On Fridays, the most popular items are: 1. Masala Dosa (↑18%), 2. Filter Coffee (↑22%), 3. Veg Noodles (↑15%). Students tend to order more snack items on Fridays.",
  "rice": "For tomorrow (Wednesday), you should stock **12–15 kg of raw rice**. This covers predicted Veg Rice (64 portions) and Curd Rice (28 portions) demand.",
  "revenue": "This week's total revenue is **₹35,760** across 726 orders. Best performing day was Friday (₹6,640). Average order value: ₹49.",
  "coffee": "Filter Coffee has the highest predicted demand at **95 cups** today with 91% confidence. It is also the highest-rated item (4.7/5). Ensure adequate coffee powder stock.",
  "popular": "Top 3 most popular items this month: 1. Masala Dosa (312 sold), 2. Filter Coffee (298 sold), 3. Veg Rice (254 sold). Masala Dosa generates the highest customer satisfaction.",
};

function getResponse(q) {
  const lower = q.toLowerCase();
  for (const [key, ans] of Object.entries(DEMO_RESPONSES)) {
    if (lower.includes(key)) return ans;
  }
  return `I found some data related to your query: "${q}"\n\n📊 **Demo Mode**: In production, this question would be sent to Databricks Genie which queries your actual order and inventory data to provide a precise, data-driven answer.\n\nTo enable live Genie: set DATABRICKS_GENIE_SPACE_ID and DATABRICKS_TOKEN in your .env file.`;
}

const SUGGESTIONS = [
  "How many masala dosas should we prepare?",
  "Which item has highest wastage?",
  "What is the busiest lunch hour?",
  "What are popular items on Fridays?",
  "How much rice to stock tomorrow?",
  "What is this week's revenue?",
];

function renderMsg(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g,'<br/>');
}

export default function GenieQA() {
  const [messages, setMessages] = useState([
    { role:"ai", text:"👋 Hi! I'm **Genie**, powered by Databricks. Ask me anything about your canteen data — orders, wastage, demand, inventory, or revenue." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const send = async (q=input) => {
    const question = q.trim();
    if (!question) return;
    setInput(""); setLoading(true);
    setMessages(p=>[...p, { role:"user", text:question }]);
    await new Promise(r=>setTimeout(r,1200));
    const ans = getResponse(question);
    setMessages(p=>[...p, { role:"ai", text:ans }]);
    setLoading(false);
  };

  return (
    <div>
      <div className="sc-topbar">
        <div className="sc-topbar-left"><h1>✨ Genie Q&A</h1><p>Databricks Genie — natural language data queries</p></div>
        <div className="sc-topbar-right"><span className="sc-demo-tag">🧪 DEMO MODE</span></div>
      </div>
      <div className="sc-page-content">
        <div className="sc-alert sc-alert-info" style={{ marginBottom:20 }}>
          <Sparkles size={16}/>
          <div><strong>Demo Mode:</strong> Genie responses are simulated. In production with DATABRICKS_GENIE_SPACE_ID configured, Genie will query your actual Databricks SQL warehouse and return live data insights.</div>
        </div>

        <div className="sc-genie-messages">
          {messages.map((m,i)=>(
            <div key={i} className={`sc-genie-msg ${m.role==="user"?"user":""}`}>
              <div className={`sc-genie-icon ${m.role==="ai"?"ai":"user-icon"}`}>
                {m.role==="ai"?<Sparkles size={16} color="white"/>:<User size={16} color="white"/>}
              </div>
              <div className={`sc-genie-bubble ${m.role}`} dangerouslySetInnerHTML={{ __html:renderMsg(m.text) }}/>
            </div>
          ))}
          {loading && (
            <div className="sc-genie-msg">
              <div className="sc-genie-icon ai"><Sparkles size={16} color="white"/></div>
              <div className="sc-genie-bubble ai" style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div className="sc-spinner" style={{ width:16, height:16 }}/> Genie is thinking...
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        <div className="sc-genie-suggestions">
          {SUGGESTIONS.map(s=>(
            <button key={s} className="sc-genie-pill" onClick={()=>send(s)}>{s}</button>
          ))}
        </div>

        <div className="sc-genie-input-row">
          <input className="sc-input" placeholder="Ask Genie anything..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} style={{ flex:1 }}/>
          <button className="sc-btn sc-btn-primary" onClick={()=>send()} disabled={loading||!input.trim()}><Send size={16}/> Ask</button>
        </div>
      </div>
    </div>
  );
}
