import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: Props) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
