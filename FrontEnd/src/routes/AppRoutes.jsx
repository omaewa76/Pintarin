import { BrowserRouter, Routes, Route } from "react-router-dom";

import DinasDashboard from "../pages/dashboard/DinasDashboard";

import OverviewPage from "../pages/dashboard/dinas/OverviewPage";
import RiskMapPage from "../pages/dashboard/dinas/RiskMapPage";
import SchoolPage from "../pages/dashboard/dinas/SchoolPage";
import CSRPage from "../pages/dashboard/dinas/CSRPage";
import AnalyticsPage from "../pages/dashboard/dinas/AnalyticsPage";
import AccountPage from "../pages/dashboard/dinas/AccountPage";
import SettingsPage from "../pages/dashboard/dinas/SettingsPage";
import SchoolReviewPage from "../pages/dashboard/dinas/SchoolReviewPage";
import CSRReviewPage from "../pages/dashboard/dinas/CSRReviewPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dinas" element={<DinasDashboard />}>
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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
