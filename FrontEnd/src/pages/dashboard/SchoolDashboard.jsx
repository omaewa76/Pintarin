import { Outlet } from "react-router-dom";

import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function SchoolDashboard() {
  return (
    <DashboardLayout role="school">
      <Outlet />
    </DashboardLayout>
  );
}