import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const { user } = useAuth();

  /* ================= NOT LOGIN ================= */

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* ================= ROLE GUARD ================= */

  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role)
  ) {
    const redirectMap = {
      dinas: "/dinas",
      school: "/school",
      csr: "/csr",
    };

    return (
      <Navigate
        to={redirectMap[user?.role] || "/login"}
        replace
      />
    );
  }

  return children;
}