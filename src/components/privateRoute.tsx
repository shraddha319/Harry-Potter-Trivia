import { Navigate, Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAuth } from '../context';

export default function PrivateRoute({ path, ...props }: RouteProps) {
  const {
    auth: { authToken },
  } = useAuth();

  return authToken ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate replace to="/login" state={{ from: path }} />
  );
}
