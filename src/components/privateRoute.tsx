import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context";

export default function PrivateRoute({ path, ...props }) {
  const {
    auth: { authToken },
  } = useAuth();

  return authToken ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate to="/login" state={{ from: path }} replace />
  );
}
