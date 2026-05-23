import { Outlet } from "react-router-dom";

import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function CSRDashboard() {
  return (
    <DashboardLayout role="csr">
      <Outlet />
    </DashboardLayout>
  );
}