import {
  createContext,
  useReducer,
  useState,
  useContext,
  useEffect,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );

  function loginWithCredentials(email, password) {
    console.log("hello", email, password);
    if (email === "test@email.com" && password === "testpassword") {
      console.log("logged in");
      localStorage.setItem("login", "true");
      setIsLoggedIn(true);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginWithCredentials }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
