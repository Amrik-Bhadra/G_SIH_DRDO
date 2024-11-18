import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <div className="flex bg-gray-100 h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
