// src/routes/ProtectedRoute.tsx
import { User } from "@/utils/types";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC<{ allowedRoles: string[] }> = ({ allowedRoles }) => {
  const storedUser = localStorage.getItem("user");
  let user: User | null = null;

  try {
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Failed to parse user from localStorage", error);
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.roleCode)) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
