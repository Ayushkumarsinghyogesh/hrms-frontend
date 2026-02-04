// Sidebar.jsx
import { FaTachometerAlt, FaUserPlus } from "react-icons/fa";

export default function Sidebar({ activePage, setActivePage }) {
  const items = [
    { name: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard" },
    { name: "Add Employee", icon: <FaUserPlus />, key: "addEmployee" }
  ];

  return (
    <div className="sidebar">
      <h2>HRMS Pro</h2>
      {items.map(item => (
        <button
          key={item.key}
          className={activePage === item.key ? "active" : ""}
          onClick={() => setActivePage(item.key)}
        >
          <span style={{ marginRight: 8 }}>{item.icon}</span> {item.name}
        </button>
      ))}
    </div>
  );
}
