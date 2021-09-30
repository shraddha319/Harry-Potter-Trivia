import { useContext, createContext, useReducer, useEffect } from 'react';
import { authReducer } from './reducer';
import { AuthContextType, AuthState } from './types';
import { useUser } from '../user/context';
import { loginUser } from './services';

const initialAuth: AuthState = {
  token: null,
  error: null,
  status: 'idle',
};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuth,
  dispatchAuth: () => undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { dispatchUser } = useUser();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) loginUser(dispatchAuth, dispatchUser, { authToken });
  }, []);

  const [auth, dispatchAuth] = useReducer(authReducer, initialAuth);

  return (
    <AuthContext.Provider value={{ dispatchAuth, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
