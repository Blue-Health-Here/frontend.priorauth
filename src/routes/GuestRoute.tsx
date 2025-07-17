// src/routes/GuestRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

type User = {
  roleCode: string;
};

const GuestRoute = () => {
  const storedUser = localStorage.getItem("user");
  let user: User | null = null;

  try {
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
  }

  if (user?.roleCode === "companyAdmin") {
    return <Navigate to="/admin/requests" replace />;
  }

  if (user?.roleCode === "pharmacyUser") {
    return <Navigate to="/pharmacy/requests" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
