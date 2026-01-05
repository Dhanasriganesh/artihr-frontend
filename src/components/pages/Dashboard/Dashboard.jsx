import React from "react";

const Dashboard = () => {
  const user = (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Employee Portal</h1>
        {user && (
          <div className="text-sm text-gray-700">
            <span className="font-medium">{user.name || "User"}</span>{" "}
            <span className="text-gray-400">•</span>{" "}
            <span className="uppercase text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
              {user.role || "EMPLOYEE"}
            </span>
          </div>
        )}
      </header>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome back{user?.name ? `, ${user.name}` : ""} 👋
          </h2>
          <p className="text-gray-600 mb-8">
            This is a placeholder dashboard. We&apos;ll add widgets for
            attendance, leaves, approvals, and more as we build the system.
          </p>

          <div className="grid gap-4 md:grid-template-columns-3">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Quick Info
              </h3>
              <p className="text-sm text-gray-600">
                You logged in successfully through the backend API. This panel
                will later show high-level stats and shortcuts.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Next Steps
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Design attendance & leave modules</li>
                <li>Implement role-based dashboards</li>
                <li>Connect more backend APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;





