import { createContext, useContext, useState, useCallback } from "react";
const AuthContext = createContext(null);
const DEMO_USERS = {
  "student@aurix.edu": { password:"student123", role:"student", name:"Rahul Kumar", id:"STU001", rollNo:"21CS045", email:"student@aurix.edu" },
  "staff@aurix.edu":   { password:"staff123",   role:"staff",   name:"Priya Sharma", id:"STF001", department:"Canteen", email:"staff@aurix.edu" },
  "admin@aurix.edu":   { password:"admin123",   role:"admin",   name:"Dr. Rajesh Nair", id:"ADM001", department:"Administration", email:"admin@aurix.edu" },
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { const s = localStorage.getItem("sc_user"); return s ? JSON.parse(s) : null; } catch { return null; } });
  const login = useCallback((email, password) => {
    const found = DEMO_USERS[email.toLowerCase().trim()];
    if (found && found.password === password) {
      const { password:_, ...safe } = found;
      setUser(safe); localStorage.setItem("sc_user", JSON.stringify(safe));
      return { success: true, user: safe };
    }
    return { success: false, error: "Invalid email or password" };
  }, []);
  const logout = useCallback(() => { setUser(null); localStorage.removeItem("sc_user"); }, []);
  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const c = useContext(AuthContext); if (!c) throw new Error("useAuth outside AuthProvider"); return c; }
