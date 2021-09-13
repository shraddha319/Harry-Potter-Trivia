import { Loader } from '../../components';
import { useAuth } from '../../context';
import { useState } from 'react';
import { registerValidationRules, validate } from '../../lib';
import { Link, useNavigate } from 'react-router-dom';
import loginIcon from '../../images/Chamber-of-secrets-key.svg';
import { registerUser, loginUser } from '../../api';
import { FormInput, FormError } from '../../types/form.types';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signupInput, setSignupInput] = useState<FormInput>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [error, setError] = useState<FormError>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [edit, setEdit] = useState(false);

  const {
    auth: { user },
    dispatchAuth,
  } = useAuth();

  function logoutHandler() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    dispatchAuth({ type: 'LOGOUT_USER' });
    navigate('/');
  }

  async function signupFormHandler() {
    const errors = validate(signupInput, registerValidationRules);
    setError(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const reqBody = (({ email, firstName, lastName, password }) => ({
          email,
          firstName,
          lastName,
          password,
        }))(signupInput);

        const { status: signUpStatus } = await registerUser(reqBody);
        const {
          data: {
            data: { user, authToken },
          },
          status: loginStatus,
        } = await loginUser({
          email: signupInput.email,
          password: signupInput.password,
        });

        if (signUpStatus === 201 && loginStatus === 200) {
          dispatchAuth({ type: 'LOGIN_USER', payload: { user, authToken } });
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
                  }: { message: string; key: string; type: string }
                ) => {
                  return { ...errObj, [key]: message };
                },
                {}
              )
            );
          }
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-2 space-y-5 lg:space-y-10">
      <header className="flex flex-row items-center justify-between space-x-6">
        <h1 className="text-lg lg:text-2xl tracking-wider text-customGray">
          User Profile
        </h1>
        <button
          type="submit"
          onClick={() => setEdit(!edit)}
          className="bg-secondary px-4 py-2 text-white tracking-wider text-xs rounded-full lg:text-sm"
        >
          {loading ? <Loader /> : edit ? 'Save' : 'Edit'}
        </button>
      </header>
      {!user ? (
        <Loader />
      ) : (
        <form
          className="flex flex-col items-center space-y-4 lg:space-y-6 w-4/5 lg:w-2/5"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="space-y-2 w-full">
            <label
              htmlFor="first_name"
              className="block text-gray-600 text-sm lg:text-lg"
            >
              First Name
            </label>
            <input
              type="text"
              name="name"
              id="first_name"
              className="text-sm lg:text-lg px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
              disabled={!edit}
              value={user.firstName}
              onChange={(e) =>
                setSignupInput({ ...signupInput, firstName: e.target.value })
              }
            />
            <small className="block text-red-500 text-xs">
              {error.firstName}
            </small>
          </p>
          <p className="space-y-2 w-full">
            <label
              htmlFor="last_name"
              className="block text-gray-600 text-sm lg:text-lg"
            >
              Last Name
            </label>
            <input
              type="text"
              name="name"
              id="last_name"
              disabled={!edit}
              className="text-sm lg:text-lg px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
              value={user.lastName}
              onChange={(e) =>
                setSignupInput({ ...signupInput, lastName: e.target.value })
              }
            />
            <small className="block text-red-500 text-xs">
              {error.lastName}
            </small>
          </p>
          <p className="space-y-2 w-full">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm lg:text-lg"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="text-sm lg:text-lg px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
              disabled={!edit}
              value={user.email}
              onChange={(e) =>
                setSignupInput({ ...signupInput, email: e.target.value })
              }
            />
            <small className="block text-red-500 text-xs">{error.email}</small>
          </p>
        </form>
      )}
      <button
        className="flex flex-col lg:flex-row items-center space-y-2"
        onClick={logoutHandler}
      >
        <img className="h-10 lg:h-8" src={loginIcon} alt="user nav icon" />
        <p className="tracking-wider text-primary lg:text-xl">Logout</p>
      </button>
    </div>
  );
}
