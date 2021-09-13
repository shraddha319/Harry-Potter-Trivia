import { ReactComponent as RegisterIcon } from '../images/quill.svg';
import { ReactComponent as AvatarMale } from '../images/avatar-male.svg';
import { ReactComponent as AvatarFemale } from '../images/avatar-female.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerValidationRules, validate } from '../lib';
import { registerUser, loginUser } from '../api';
import { useAuth } from '../context';
import { Loader } from '../components';
import { FormInput, FormError } from '../types/form.types';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signupInput, setSignupInput] = useState<FormInput>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<FormError>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { dispatchAuth } = useAuth();

  // function genderInputHandler(e) {
  //   if (e.target.checked)
  //     setSignupInput({ ...signupInput, gender: e.target.value });
  // }

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
    <div className="flex flex-col items-center p-2 space-y-5">
      <header className="flex flex-row items-center space-x-2">
        <h1 className="text-lg lg:text-2xl tracking-wider text-primary">
          Let's Get Started!
        </h1>
        <RegisterIcon fill="#CDB750" className="w-12 h-12" />
      </header>
      <form
        className="flex flex-col items-center space-y-4 lg:space-y-6 w-4/5 lg:w-2/5"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* <div className="m-2">
          {signupInput.gender === 'FEMALE' ? (
            <AvatarFemale fill="#000" className="w-12 h-12 lg:w-14 lg:h-14" />
          ) : (
            <AvatarMale fill="#000" className="w-12 h-12 lg:w-14 lg:h-14" />
          )}
        </div> */}
        <p className="w-full flex justify-center space-x-3">
          <p className="space-y-1">
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
              placeholder="First Name"
              value={signupInput.firstName}
              onChange={(e) =>
                setSignupInput({ ...signupInput, firstName: e.target.value })
              }
            />
            <small className="block text-red-500 text-xs">
              {error.firstName}
            </small>
          </p>
          <p className="space-y-1">
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
              className="text-sm lg:text-lg px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
              placeholder="Last Name"
              value={signupInput.lastName}
              onChange={(e) =>
                setSignupInput({ ...signupInput, lastName: e.target.value })
              }
            />
            <small className="block text-red-500 text-xs">
              {error.lastName}
            </small>
          </p>
        </p>
        <p className="space-y-2 px-2 py-1 w-full">
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
            placeholder="Email"
            value={signupInput.email}
            onChange={(e) =>
              setSignupInput({ ...signupInput, email: e.target.value })
            }
          />
          <small className="block text-red-500 text-xs">{error.email}</small>
        </p>
        <p className="space-y-2 px-2 py-1 w-full">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm lg:text-lg"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="text-sm lg:text-lg px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
            placeholder="Password"
            value={signupInput.password}
            onChange={(e) =>
              setSignupInput({ ...signupInput, password: e.target.value })
            }
          />
          <small className="block text-red-500 text-xs">{error.password}</small>
        </p>
        <p className="space-y-2 px-2 py-1 w-full">
          <label
            htmlFor="confirm_password"
            className="block text-gray-600 text-sm lg:text-lg"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="password"
            id="confirm_password"
            className="text-sm lg:text-lg px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
            placeholder="Confirm Password"
            value={signupInput.confirmPassword}
            onChange={(e) =>
              setSignupInput({
                ...signupInput,
                confirmPassword: e.target.value,
              })
            }
          />
          <small className="block text-red-500 text-xs">
            {error.confirmPassword}
          </small>
        </p>
        {/* <p className="space-x-4">
          <label htmlFor="gender_male" className="space-x-2">
            <input
              type="radio"
              name="gender"
              id="gender_male"
              value="MALE"
              checked={signupInput.gender === 'MALE'}
              onChange={genderInputHandler}
            />
            <span className="text-xs lg:text-base text-gray-400">Male</span>
          </label>
          <label htmlFor="gender_female" className="space-x-2">
            <input
              type="radio"
              name="gender"
              id="gender_female"
              value="FEMALE"
              checked={signupInput.gender === 'FEMALE'}
              onChange={genderInputHandler}
            />
            <span className="text-xs lg:text-base text-gray-400">Female</span>
          </label>
        </p> */}
        <button
          type="submit"
          onClick={signupFormHandler}
          className="bg-primary px-4 py-2 text-white tracking-wider text-sm rounded-full lg:text-lg"
        >
          {loading ? <Loader /> : 'Register'}
        </button>
      </form>
      <p className="text-customGray text-xs p-2 lg:text-base">
        Already have an account?{' '}
        <Link
          to="/login"
          className="inline-block text-xs text-primary underline lg:text-base"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}
