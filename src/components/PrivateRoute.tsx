import { Navigate, Route } from "react-router-dom";

export default function PrivateRoute({ isLoggedIn, path, ...props }) {
  return isLoggedIn ? (
    <Route {...props} />
  ) : (
    <Navigate to="/login" state={{ from: [path] }} />
  );
}
