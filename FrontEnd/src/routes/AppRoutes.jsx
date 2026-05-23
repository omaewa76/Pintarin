import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";

/* ================= PUBLIC ================= */
import LandingPage from "../pages/public/LandingPage";
import LoginPage from "../pages/public/LoginPage";

/* ================= DINAS ================= */
import DinasDashboard from "../pages/dashboard/DinasDashboard";

import OverviewPage from "../pages/dashboard/dinas/OverviewPage";
import RiskMapPage from "../pages/dashboard/dinas/RiskMapPage";
import SchoolPage from "../features/school/pages/SchoolPage";
import SchoolReviewPage from "../pages/dashboard/dinas/SchoolReviewPage";
import CSRPage from "../pages/dashboard/dinas/CSRPage";
import CSRReviewPage from "../pages/dashboard/dinas/CSRReviewPage";
import AnalyticsPage from "../pages/dashboard/dinas/AnalyticsPage";
import AccountPage from "../pages/dashboard/dinas/AccountPage";
import SettingsPage from "../pages/dashboard/dinas/SettingsPage";

/* ================= SCHOOL ================= */
import SchoolDashboard from "../pages/dashboard/SchoolDashboard";

import SchoolOverviewPage from "../pages/dashboard/school/OverviewPage";
import SchoolProfilePage from "../pages/dashboard/school/ProfilePage";
import SchoolAssistancePage from "../pages/dashboard/school/AssistancePage";
import SchoolAnalyticsPage from "../pages/dashboard/school/AnalyticsPage";
import SchoolReportsPage from "../pages/dashboard/school/ReportsPage";

/* ================= CSR ================= */
import CSRDashboard from "../pages/dashboard/CSRDashboard";

import CSROverviewPage from "../pages/dashboard/csr/OverviewPage";
import CSRSchoolsPage from "../pages/dashboard/csr/SchoolsPage";
import CSRDistributionPage from "../pages/dashboard/csr/DistributionPage";
import CSRAnalyticsPage from "../pages/dashboard/csr/AnalyticsPage";
import CSRReportsPage from "../pages/dashboard/csr/ReportsPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        {/* ================= DINAS ================= */}
        <Route
          path="/dinas"
          element={
            <ProtectedRoute allowedRoles={["dinas"]}>
              <DinasDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />

          <Route path="risk-map" element={<RiskMapPage />} />

          <Route path="schools" element={<SchoolPage />} />

          <Route path="schools/review" element={<SchoolReviewPage />} />

          <Route path="csr" element={<CSRPage />} />

          <Route path="csr/review" element={<CSRReviewPage />} />

          <Route path="analytics" element={<AnalyticsPage />} />

          <Route path="accounts" element={<AccountPage />} />

          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* ================= SCHOOL ================= */}
        <Route
          path="/school"
          element={
            <ProtectedRoute allowedRoles={["school"]}>
              <SchoolDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<SchoolOverviewPage />} />

          <Route path="profile" element={<SchoolProfilePage />} />

          <Route path="assistance" element={<SchoolAssistancePage />} />

          <Route path="analytics" element={<SchoolAnalyticsPage />} />

          <Route path="reports" element={<SchoolReportsPage />} />
        </Route>

        {/* ================= CSR ================= */}
        <Route
          path="/csr"
          element={
            <ProtectedRoute allowedRoles={["csr"]}>
              <CSRDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<CSROverviewPage />} />

          <Route path="schools" element={<CSRSchoolsPage />} />

          <Route path="distribution" element={<CSRDistributionPage />} />

          <Route path="analytics" element={<CSRAnalyticsPage />} />

          <Route path="reports" element={<CSRReportsPage />} />
        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
