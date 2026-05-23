import { Outlet } from "react-router-dom";

import DashboardLayout from "../../components/layouts/DashboardLayout";

function DinasDashboard() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

export default DinasDashboard;
