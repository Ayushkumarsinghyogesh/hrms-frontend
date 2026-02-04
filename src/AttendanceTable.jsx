// AttendanceTable.jsx
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AttendanceTable({ attendance, filterDate, setFilterDate }) {
  return (
    <div>
      <h3>Attendance Records</h3>
      <DatePicker
        selected={filterDate}
        onChange={date => setFilterDate(date)}
        placeholderText="Select a date"
        dateFormat="yyyy-MM-dd"
        className="datepicker-input"
      />
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance
            .filter(a => !filterDate || a.date === filterDate.toISOString().slice(0, 10))
            .map(a => (
              <tr key={a.id}>
                <td>{a.employee_name}</td>
                <td>{a.date}</td>
                <td>{a.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
