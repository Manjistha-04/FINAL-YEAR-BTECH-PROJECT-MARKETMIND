import { Navigate } from "react-router-dom";

export function AdminRoute({
  children,
}: any) {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  /* NOT LOGGED IN */
  if (!user.email) {
    return <Navigate to="/login" />;
  }

  /* NOT ADMIN */
  if (user.role !== "admin") {
    return <Navigate to="/trade" />;
  }

  /* ADMIN ACCESS */
  return children;
}