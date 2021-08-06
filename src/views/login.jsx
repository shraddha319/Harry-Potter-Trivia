import { ReactComponent as Gryffindor } from "../images/Gryffindor.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { useState } from "react";
import { loginValidationRules, validate } from "../lib";

export default function Login() {
  const { loginWithCredentials, isLoggedIn } = useAuth();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  function loginHandler() {
    const errors = validate(loginInput, loginValidationRules);
    console.log(loginInput, loginValidationRules);
    console.log(errors);
    if (errors === {}) {
      loginWithCredentials(loginInput.email, loginInput.password);
      navigate(state?.from ? state.from : "/category");
    } else {
      setError(errors);
    }
  }

  return (
    <div className="bg-white w-full h-full flex flex-col items-center p-4">
      <Gryffindor className="w-36 h-36 my-4" fill="#E63E2D" />
      <p className="text-customGray text-sm tracking-wide">
        No password, no entry!
      </p>
      <form
        className="flex flex-col items-center space-y-6 my-6 w-4/5"
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="space-y-2 px-2 py-1">
          <label htmlFor="email" className="block text-gray-600 text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="text-sm px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
            placeholder="Email"
            value={loginInput.email}
            onChange={(e) =>
              setLoginInput({ ...loginInput, email: e.target.value })
            }
          />
          <small className="block text-red-500 text-xs">{error.email}</small>
        </p>
        <p className="space-y-2 px-2 py-1">
          <label htmlFor="password" className="block text-gray-600 text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="text-sm px-2 py-1 tracking-wider bg-transparent text-gray-500 border-gray-500 border-b-2 w-full"
            placeholder="Password"
            value={loginInput.password}
            onChange={(e) =>
              setLoginInput({ ...loginInput, password: e.target.value })
            }
          />
          <p className="block text-red-500 text-xs">{error.password}</p>
        </p>
        <button
          type="submit"
          onClick={loginHandler}
          className="bg-secondary px-4 py-2 text-white text-sm font-bold tracking-widest rounded-full"
        >
          Entry
        </button>
      </form>
      <p className="text-customGray text-xs">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="inline-block text-xs text-primary underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
