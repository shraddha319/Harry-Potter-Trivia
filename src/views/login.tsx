import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { useState } from 'react';
import { HouseIcon, Loader } from '../components';
import { loginValidationRules, validate } from '../lib';
import { loginUser } from '../api';
import { FormInput, FormError } from '../types/form.types';

export default function Login() {
  const [loginInput, setLoginInput] = useState<FormInput>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<FormError>({
    login: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { dispatchAuth } = useAuth();
  const navigate = useNavigate();

  async function testLoginHandler() {
    try {
      const credentials: {
        email: string;
        password: string;
      } = {
        email: process.env.REACT_APP_TEST_EMAIL || '',
        password: process.env.REACT_APP_TEST_PASSWORD || '',
      };

      const {
        data: {
          data: { user, authToken },
        },
        status,
      } = await loginUser(credentials);
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
        navigate('/category');
      }
    } catch (err) {
      if (err.response) {
        const {
          data: {
            error: { errors },
          },
          status,
        } = err.response;
        if (status === 400 && errors) {
          setError(
            errors.reduce(
              (
                errObj: FormError,
                {
                  message,
                  key,
                  type,
                }: { message: string; type: string; key: string }
              ) => {
                return { ...errObj, [key]: message };
              },
              {}
            )
          );
        } else if (status > 400) {
          setError({
            email: '',
            password: '',
            login: 'Incorrect username/password',
          });
        }
      }
    }
  }

  async function loginHandler() {
    const validationError = validate(loginInput, loginValidationRules);
    setError({ ...error, ...validationError });

    if (Object.keys(validationError).length === 0) {
      setLoading(true);
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
          navigate('/category');
        }
      } catch (err) {
        if (err.response) {
          const {
            data: {
              error: { errors },
            },
            status,
          } = err.response;
          if (status === 400 && errors) {
            setError(
              errors.reduce(
                (
                  errObj: FormError,
                  {
                    message,
                    key,
                    type,
                  }: { message: string; type: string; key: string }
                ) => {
                  return { ...errObj, [key]: message };
                },
                {}
              )
            );
          } else if (status > 400) {
            setError({
              email: '',
              password: '',
              login: 'Incorrect username/password',
            });
          }
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="bg-white w-full h-full flex flex-col items-center p-4">
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
        <p className="block text-red-500 text-sm ">{error.login}</p>
        <p className="space-y-2 px-2 py-1">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm lg:text-lg"
          >
            Email
          </label>
          <input
            id="email"
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
            id="password"
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
          className="bg-primary px-4 py-2 text-white text-sm lg:text-lg font-bold tracking-widest rounded-full"
        >
          {loading ? <Loader /> : 'Entry'}
        </button>
      </form>
      <p className="space-y-2 flex flex-col items-center">
        <p className="text-customGray text-xs lg:text-base space-x-2">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className="inline-block text-xs lg:text-base text-primary underline"
          >
            Sign Up
          </Link>
        </p>
        <p className="text-customGray text-xs lg:text-base space-x-2">
          <button
            type="submit"
            onClick={testLoginHandler}
            className="bg-white underline border-primary text-primary px-3 py-1 text-sm lg:text-base font-bold tracking-widest"
          >
            Test Login
          </button>
        </p>
      </p>
    </div>
  );
}
