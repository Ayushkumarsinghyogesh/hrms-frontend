// AddEmployee.jsx
export default function AddEmployee({ form, setForm, addEmployee }) {
  return (
    <div>
      <h3>Add Employee</h3>
      <input placeholder="Employee ID" value={form.employee_id} onChange={e => setForm({ ...form, employee_id: e.target.value })} />
      <input placeholder="Full Name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
      <button className="btn-primary" onClick={addEmployee}>Add Employee</button>
    </div>
  );
}
