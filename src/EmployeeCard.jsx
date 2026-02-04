// EmployeeCard.jsx
export default function EmployeeCard({ emp, presentDays, onMarkPresent, onDelete }) {
  return (
    <div className="employee-card">
      <strong>{emp.full_name}</strong>
      <div>{emp.department}</div>
      <div style={{ fontSize: "12px", color: "#94a3b8" }}>
        Present Days: {presentDays || 0}
      </div>
      <div className="employee-actions">
        <button className="btn-secondary" onClick={() => onMarkPresent(emp.id)}>Mark Present</button>
        <button className="btn-danger" onClick={() => onDelete(emp.id)}>Delete</button>
      </div>
    </div>
  );
}
