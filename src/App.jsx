import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import AddEmployee from "./AddEmployee";

const API_URL = "https://hrms-backend-3-w3tn.onrender.com";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [filterDate, setFilterDate] = useState(null);

  const [form, setForm] = useState({ employee_id: "", full_name: "", email: "", department: "" });

  useEffect(() => {
    loadEmployees();
    loadAttendance();
  }, []);

  const loadEmployees = async () => {
    const res = await fetch(`${API_URL}/employees/`);
    setEmployees(await res.json());
  };

  const loadAttendance = async () => {
    const res = await fetch(`${API_URL}/attendance/`);
    setAttendance(await res.json());
  };

  const addEmployee = async () => {
    await fetch(`${API_URL}/employees/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ employee_id: "", full_name: "", email: "", department: "" });
    loadEmployees();
  };

  const deleteEmployee = async (id) => {
    await fetch(`${API_URL}/employees/${id}/`, { method: "DELETE" });
    loadEmployees();
  };

  const markPresent = async (empId) => {
    const today = new Date().toISOString().slice(0, 10);
    const res = await fetch(`${API_URL}/attendance/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employee: empId, date: today, status: "Present" })
    });
    if (!res.ok) {
      alert("Attendance already marked for today");
      return;
    }
    loadAttendance();
  };

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="page-content">
        {activePage === "dashboard" && (
          <Dashboard
            employees={employees}
            attendance={attendance}
            markPresent={markPresent}
            deleteEmployee={deleteEmployee}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
          />
        )}
        {activePage === "addEmployee" && (
          <AddEmployee form={form} setForm={setForm} addEmployee={addEmployee} />
        )}
      </div>
    </div>
  );
}

export default App;
