import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/public/LoginPage";

import AdminDashboard from "../pages/dashboard/AdminDashboard";
import DinasDashboard from "../pages/dashboard/DinasDashboard";
import CSRDashboard from "../pages/dashboard/CSRDashboard";
import SchoolDashboard from "../pages/dashboard/SchoolDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dinas" element={<DinasDashboard />} />
        <Route path="/csr" element={<CSRDashboard />} />
        <Route path="/school" element={<SchoolDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;