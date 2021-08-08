import { createContext, useState, useContext, useReducer } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );

  function authReducer(auth, action) {
    switch (action.type) {
      case "SET_AUTH_TOKEN":
        return { ...auth, authToken: action.payload.authToken };

      case "SET_USER":
        return { ...auth, user: action.payload.user };

      default:
        return auth;
    }
  }

  const [auth, dispatchAuth] = useReducer(authReducer, {
    user: {},
    authToken: null,
  });

  function logoutUser() {
    localStorage.removeItem("login");
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, dispatchAuth, auth, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
