import { createContext, useContext, useReducer, useEffect } from "react";
import { API, getUser } from "../api";

const AuthContext = createContext();

function authReducer(auth, action) {
  switch (action.type) {
    case "SET_AUTH_TOKEN":
      return { ...auth, authToken: action.payload.authToken };

    case "SET_USER":
      return { ...auth, user: action.payload.user };

    case "LOGOUT_USER":
      return {
        user: {},
        authToken: null,
      };

    default:
      return auth;
  }
}

export function AuthProvider({ children }) {
  const initialAuth = {
    user: {
      _id: localStorage.getItem("userId") || null,
    },
    authToken: localStorage.getItem("authToken") || null,
  };
  const [auth, dispatchAuth] = useReducer(authReducer, initialAuth);

  useEffect(() => {
    if (auth.authToken)
      API.defaults.headers.common["Authorization"] = auth.authToken;
  }, [auth.authToken]);

  useEffect(() => {
    (async () => {
      if (auth.authToken && auth.user._id) {
        try {
          const {
            data: {
              data: { user },
            },
            status,
          } = await getUser(auth.user._id);
          if (status === 200) {
            dispatchAuth({ type: "SET_USER", payload: { user } });
          }
        } catch (err) {
          if (err.response && err.response.status === 403) {
            dispatchAuth({ type: "SET_TOKEN", payload: { authToken: null } });
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
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

export function useAuth() {
  return useContext(AuthContext);
}
