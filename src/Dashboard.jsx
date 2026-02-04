import EmployeeCard from "./EmployeeCard";
import AttendanceTable from "./AttendanceTable";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard({ employees, attendance, markPresent, deleteEmployee, filterDate, setFilterDate }) {
  const today = new Date().toISOString().slice(0, 10);

  // Count present days per employee
  const presentDaysByEmployee = attendance.reduce((acc, a) => {
    if (a.status === "Present") acc[a.employee_name] = (acc[a.employee_name] || 0) + 1;
    return acc;
  }, {});

  // Total present today
  const presentTodayCount = attendance.filter(a => a.date === today && a.status === "Present").length;

  // Prepare chart data
  const chartData = employees.map(emp => ({
    name: emp.full_name,
    Present: presentDaysByEmployee[emp.full_name] || 0
  }));

  return (
    <div>
      <h3>Dashboard</h3>

      {/* Dashboard Cards */}
      <div className="dashboard">
        <div className="dashboard-card">
          <span>Total Employees</span>
          <strong>{employees.length}</strong>
        </div>
        <div className="dashboard-card">
          <span>Present Today</span>
          <strong>{presentTodayCount}</strong>
        </div>
        <div className="dashboard-card">
          <span>Employees with Attendance</span>
          <strong>{chartData.filter(d => d.Present > 0).length}</strong>
        </div>
      </div>

      {/* Attendance Chart */}
      <h3>Attendance Overview</h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="Present" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Employees */}
      <h3>Employees</h3>
      {employees.map(emp => (
        <EmployeeCard
          key={emp.id}
          emp={emp}
          presentDays={presentDaysByEmployee[emp.full_name]}
          onMarkPresent={markPresent}
          onDelete={deleteEmployee}
        />
      ))}

      {/* Attendance Table */}
      <AttendanceTable attendance={attendance} filterDate={filterDate} setFilterDate={setFilterDate} />
    </div>
  );
}
