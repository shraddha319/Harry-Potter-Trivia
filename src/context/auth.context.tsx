import { createContext, useContext, useReducer, useEffect } from 'react';
import { API, getUser } from '../api';
import { authReducer } from './reducers/auth.reducer';
import { AuthContextType, AuthState } from './types/auth.types';

const initialAuth: AuthState = {
  user: null,
  leaderboard: null,
  authToken: localStorage.getItem('authToken') || null,
  history: null,
};

const AuthContext = createContext<AuthContextType>({
  auth: initialAuth,
  dispatchAuth: () => undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, dispatchAuth] = useReducer(authReducer, initialAuth);

  API.defaults.headers.common['Authorization'] = auth.authToken;

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem('userId');
      if (auth.authToken && userId) {
        try {
          const {
            data: {
              data: { user },
            },
            status,
          } = await getUser(userId);
          if (status === 200) {
            dispatchAuth({ type: 'SET_USER', payload: { user } });
          }
        } catch (err) {
          if (err.response && err.response.status === 403) {
            dispatchAuth({
              type: 'LOGOUT_USER',
            });
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
          }
        }
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ dispatchAuth, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
