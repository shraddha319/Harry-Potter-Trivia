import { ReactComponent as Gryffindor } from "../images/Gryffindor.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { useState } from "react";

export default function Login() {
  const { loginWithCredentials, isLoggedIn } = useAuth();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  function loginUser() {
    loginWithCredentials(loginInput.email, loginInput.password);
    navigate(state?.from ? state.from : "/category");
  }

  return (
    <div className="bg-primary w-full h-full flex flex-col items-center justify-evenly">
      <Gryffindor className="w-36 h-36" fill="#fff" />
      <p className="text-white text-sm tracking-wide">No password, no entry!</p>
      <form
        className="flex flex-col items-center space-y-6"
        onSubmit={loginUser}
      >
        <input
          type="email"
          name="email"
          className="px-2 py-1 text-sm tracking-wider bg-transparent text-white border-b-2"
          placeholder="Email"
          value={loginInput.email}
          onChange={(e) =>
            setLoginInput({ ...loginInput, email: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          className="px-2 py-1 text-sm tracking-wider bg-transparent text-white border-b-2"
          placeholder="Password"
          value={loginInput.password}
          onChange={(e) =>
            setLoginInput({ ...loginInput, password: e.target.value })
          }
        />
        <button
          type="submit"
          className="bg-secondary px-4 py-2 text-white text-sm font-bold tracking-widest rounded-full"
        >
          Entry
        </button>
      </form>
      <p className="text-customGray text-xs">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="inline-block text-xs text-white underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
