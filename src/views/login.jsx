import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { useState } from 'react';
import { Alert, HouseIcon } from '../components';
import { loginValidationRules, validate } from '../lib';
import { loginUser } from '../api';

export default function Login() {
  const [alert, setAlert] = useState(null);
  const { dispatchAuth } = useAuth();
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const { state } = useLocation();
  const navigate = useNavigate();

  async function loginHandler() {
    const validationError = validate(loginInput, loginValidationRules);
    setError(validationError);
    if (Object.keys(validationError).length === 0) {
      try {
        const {
          data: {
            data: { user, authToken },
          },
          status,
        } = await loginUser(loginInput);
        if (status === 200) {
          dispatchAuth({
            type: 'SET_AUTH_TOKEN',
            payload: { authToken },
          });
          dispatchAuth({
            type: 'SET_USER',
            payload: { user },
          });
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('userId', user._id);
          navigate(state?.from && state.from !== '/signup' ? state.from : '/');
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setAlert({
            type: 'ERROR',
            message: 'Incorrect email/password. Authentication failed.',
            code: 401,
          });
        } else if (err.request) console.log(err.request);
        else console.log(err.message);
      }
    }
  }

  return (
    <div className="bg-white w-full h-full flex flex-col items-center p-4">
      {state?.from === '/signup' && state?.user && (
        <div>
          <h2>Account created successfull for {state.user}</h2>
          <h3>Login with your credentials to continue</h3>
        </div>
      )}
      {alert && <Alert {...alert} />}
      <div className="my-4">
        <HouseIcon />
      </div>
      <p className="text-customGray text-sm lg:text-lg tracking-wide">
        No password, no entry!
      </p>
      <form
        className="flex flex-col items-center space-y-6 lg:space-y-8 my-6 w-4/5"
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="space-y-2 px-2 py-1">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm lg:text-lg"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            className="text-sm lg:text-lg px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
            placeholder="Email"
            value={loginInput.email}
            onChange={(e) =>
              setLoginInput({ ...loginInput, email: e.target.value })
            }
          />
          <small className="block text-red-500 text-xs">{error.email}</small>
        </p>
        <p className="space-y-2 px-2 py-1">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm lg:text-lg"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            className="text-sm lg:text-lg px-2 py-1 tracking-wider bg-transparent text-gray-500 border-gray-500 border-b-2 w-full"
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
          className="bg-secondary px-4 py-2 text-white text-sm lg:text-lg font-bold tracking-widest rounded-full"
        >
          Entry
        </button>
      </form>
      <p className="text-customGray text-xs lg:text-base">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="inline-block text-xs lg:text-base text-primary underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
