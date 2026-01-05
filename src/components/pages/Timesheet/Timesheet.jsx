import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaClock } from "react-icons/fa";
import Logo from "../../../assets/Logo.png";

const Timesheet = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("timesheet");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [month, setMonth] = useState("January");
  
  const user = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const [empId, setEmpId] = useState(user?.userId || "");
  const [name, setName] = useState(user?.name || "");
  const [manager, setManager] = useState("");

  // Helper functions for date conversion
  const convertYYYYMMDDToDDMMYY = (yyyymmdd) => {
    if (!yyyymmdd || !yyyymmdd.match(/^\d{4}-\d{2}-\d{2}$/)) return "";
    const parts = yyyymmdd.split('-');
    const year = parts[0].slice(-2);
    return `${parts[2]}-${parts[1]}-${year}`;
  };

  const [timesheetRows, setTimesheetRows] = useState([
    {
      date: "", // Empty by default
      day: "",
      shift: "",
      forenoonIn: "",
      forenoonOut: "",
      afternoonIn: "",
      afternoonOut: "",
      hoursCompleted: "",
      overtime: "",
      totalDailyHours: "",
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const sidebarItems = [
    { id: "home", label: "Home", path: "/dashboard", icon: FaHome },
    { id: "timesheet", label: "Timesheet", path: "/dashboard/timesheet", icon: FaClock },
  ];

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const shifts = ["Day Shift", "Night Shift", "Evening Shift"];

  const handleFieldChange = (index, field, value) => {
    const newRows = [...timesheetRows];
    newRows[index][field] = value;
    
    // Calculate total daily hours if hours completed and overtime are filled
    if (field === "hoursCompleted" || field === "overtime") {
      const hoursCompleted = parseFloat(newRows[index].hoursCompleted) || 0;
      const overtime = parseFloat(newRows[index].overtime) || 0;
      newRows[index].totalDailyHours = (hoursCompleted + overtime).toFixed(2);
    }
    
    setTimesheetRows(newRows);
  };

  const handleAddRow = () => {
    const newRow = {
      date: "", // Empty by default
      day: "",
      shift: "",
      forenoonIn: "",
      forenoonOut: "",
      afternoonIn: "",
      afternoonOut: "",
      hoursCompleted: "",
      overtime: "",
      totalDailyHours: "",
    };
    setTimesheetRows([...timesheetRows, newRow]);
  };

  const handleSubmit = () => {
    // TODO: Submit timesheet to backend
    alert("Timesheet submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-gray-700 font-medium">
              {user.userId || user.email || "User"}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-sm flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? "w-16" : "w-48"
          }`}
          onMouseEnter={() => setIsSidebarCollapsed(false)}
          onMouseLeave={() => setIsSidebarCollapsed(true)}
        >
          <div className={`p-4 border-b border-gray-200 ${isSidebarCollapsed ? "px-2" : ""}`}>
            {!isSidebarCollapsed && (
              <h2 className="text-base font-semibold text-gray-900">Dashboard</h2>
            )}
          </div>
          <nav className="flex-1 p-3">
            <ul className="space-y-1">
              {sidebarItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveItem(item.id);
                        navigate(item.path);
                        setIsSidebarCollapsed(false);
                      }}
                      className={`w-full text-left rounded-lg transition-colors text-sm flex items-center ${
                        isSidebarCollapsed ? "px-2 justify-center" : "px-3 gap-2"
                      } py-2 ${
                        activeItem === item.id
                          ? "bg-orange-50 text-orange-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
                      {!isSidebarCollapsed && <span>{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Timesheet</h1>
            </div>

            {/* Employee/Manager Details */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">EmpId</label>
                  <input
                    type="text"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter Employee ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                  <input
                    type="text"
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter Manager Name"
                  />
                </div>
              </div>
            </div>

            {/* Timesheet Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                        Date
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                        Day
                      </th>
                      <th className="px-2 py-1.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                        Shift
                      </th>
                      <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200" colSpan={2}>
                        Forenoon
                      </th>
                      <th className="px-2 py-1.5 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200" colSpan={2}>
                        Afternoon
                      </th>
                      <th className="px-1 py-1.5 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 w-20">
                        Hours Completed
                      </th>
                      <th className="px-1 py-1.5 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200 w-20">
                        Overtime
                      </th>
                      <th className="px-1 py-1.5 text-center text-xs font-medium text-gray-700 uppercase tracking-wider w-20">
                        Total Daily Hours
                      </th>
                    </tr>
                    <tr className="bg-orange-50">
                      <th colSpan={3} className="px-2 py-0.5"></th>
                      <th className="px-2 py-0.5 text-center text-xs font-medium text-gray-600 uppercase border-r border-gray-200">In</th>
                      <th className="px-2 py-0.5 text-center text-xs font-medium text-gray-600 uppercase border-r border-gray-200">Out</th>
                      <th className="px-2 py-0.5 text-center text-xs font-medium text-gray-600 uppercase border-r border-gray-200">In</th>
                      <th className="px-2 py-0.5 text-center text-xs font-medium text-gray-600 uppercase border-r border-gray-200">Out</th>
                      <th colSpan={3} className="px-2 py-0.5"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timesheetRows.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-2 py-1.5 whitespace-nowrap border-r border-gray-200">
                          <div className="relative flex items-center">
                            <input
                              type="text"
                              value={row.date ? convertYYYYMMDDToDDMMYY(row.date) : ""}
                              placeholder="dd-mm-yy"
                              readOnly
                              onClick={() => {
                                const dateInput = document.getElementById(`date-input-${index}`);
                                dateInput?.showPicker?.() || dateInput?.click();
                              }}
                              className="w-full px-2 py-1 pr-6 bg-gray-50 border border-gray-300 rounded text-xs text-gray-900 focus:outline-none cursor-pointer placeholder:text-gray-900"
                            />
                            <input
                              id={`date-input-${index}`}
                              type="date"
                              value={row.date}
                              onChange={(e) => handleFieldChange(index, "date", e.target.value)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <svg 
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-900 pointer-events-none" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap border-r border-gray-200">
                          <select
                            value={row.day}
                            onChange={(e) => handleFieldChange(index, "day", e.target.value)}
                            className="w-full px-2 py-1 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="">Select</option>
                            {daysOfWeek.map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap border-r border-gray-200">
                          <select
                            value={row.shift}
                            onChange={(e) => handleFieldChange(index, "shift", e.target.value)}
                            className="w-full px-2 py-1 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="">Select</option>
                            {shifts.map((shift) => (
                              <option key={shift} value={shift}>
                                {shift}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap border-r border-gray-200">
                          <input
                            type="time"
                            value={row.forenoonIn}
                            onChange={(e) => handleFieldChange(index, "forenoonIn", e.target.value)}
                            className="w-full px-2 py-1 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                            placeholder="--:--"
                          />
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap border-r border-gray-200">
                          <input
                            type="time"
                            value={row.forenoonOut}
                            onChange={(e) => handleFieldChange(index, "forenoonOut", e.target.value)}
                            className="w-full px-2 py-1 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                            placeholder="--:--"
                          />
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap border-r border-gray-200">
                          <input
                            type="time"
                            value={row.afternoonIn}
                            onChange={(e) => handleFieldChange(index, "afternoonIn", e.target.value)}
                            className="w-full px-2 py-1 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                            placeholder="--:--"
                          />
                        </td>
                        <td className="px-2 py-1.5 whitespace-nowrap border-r border-gray-200">
                          <input
                            type="time"
                            value={row.afternoonOut}
                            onChange={(e) => handleFieldChange(index, "afternoonOut", e.target.value)}
                            className="w-full px-2 py-1 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                            placeholder="--:--"
                          />
                        </td>
                        <td className="px-1 py-1.5 whitespace-nowrap border-r border-gray-200 w-20">
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={row.hoursCompleted}
                            onChange={(e) => handleFieldChange(index, "hoursCompleted", e.target.value)}
                            className="w-full px-1 py-1 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent text-center"
                            placeholder="0"
                          />
                        </td>
                        <td className="px-1 py-1.5 whitespace-nowrap border-r border-gray-200 w-20">
                          <input
                            type="number"
                            min="0"
                            step="0.5"
                            value={row.overtime}
                            onChange={(e) => handleFieldChange(index, "overtime", e.target.value)}
                            className="w-full px-1 py-1 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent text-center"
                            placeholder="0"
                          />
                        </td>
                        <td className="px-1 py-1.5 whitespace-nowrap w-20">
                          <input
                            type="text"
                            value={row.totalDailyHours || ""}
                            readOnly
                            className="w-full px-1 py-1 bg-gray-100 border border-gray-300 rounded text-xs focus:outline-none text-center"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleAddRow}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Row
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Submit Timesheet
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Timesheet;
