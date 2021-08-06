import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context";

export default function PrivateRoute({ path, ...props }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate to="/login" state={{ from: path }} replace />
  );
}
