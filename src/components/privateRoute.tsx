import { Navigate, Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAuth } from '../contexts';

export default function PrivateRoute({ path, ...props }: RouteProps) {
  const {
    auth: { token },
  } = useAuth();

  return token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate replace to="/login" state={{ from: path }} />
  );
}
