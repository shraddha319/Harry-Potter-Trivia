import { ReactComponent as RegisterIcon } from "../images/quill.svg";
import { ReactComponent as AvatarMale } from "../images/avatar-male1.svg";
import { ReactComponent as AvatarFemale } from "../images/avatar-female.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerValidationRules, validate, formError } from "../lib";
import { registerUser, verifyIfAvailable } from "../api";
import { useAuth } from "../context";

export default function Signup() {
  const { EMAIL_UNIQUE, USERNAME_UNIQUE } = formError;
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [signupInput, setSignupInput] = useState({
    username: "",
    email: "",
    gender: "MALE",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function genderInputHandler(e) {
    if (e.target.checked)
      setSignupInput({ ...signupInput, gender: e.target.value });
  }

  async function signupFormHandler() {
    const errors = validate(signupInput, registerValidationRules);
    try {
      setLoading(true);
      if (!errors.email) {
        const res = await verifyIfAvailable({
          key: "email",
          value: signupInput.email,
        });
        if (res.status === 200) errors["email"] = EMAIL_UNIQUE;
      }
      if (!errors.username) {
        const { status } = await verifyIfAvailable({
          key: "username",
          value: signupInput.username,
        });
        if (status === 200) errors["username"] = USERNAME_UNIQUE;
      }
    } catch (err) {
      if (err.request) console.log(err.request);
      else console.log(err.message);
    } finally {
      setLoading(false);
    }

    setError(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        const {
          data: {
            data: { user },
          },
          status,
        } = await registerUser({
          ...signupInput,
          confirmPassword: undefined,
        });
        if (status === 201) {
          navigate("/login", { state: { from: "/signup", user: user.email } });
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          // if(err.response.status >= 500) dispatchQuiz({type: "SET_5XX_ERROR"} )
        }
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-2 space-y-4">
      <header className="flex flex-col items-center">
        <h1 className="text-lg tracking-wider text-primary">
          Let's Get Started!
        </h1>
        <RegisterIcon fill="#CDB750" className="w-16 h-16" />
      </header>
      <form
        className="flex flex-col items-center space-y-6 my-6 w-4/5"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="flex flex-row items-center space-x-2 border-2 border-gray-500 rounded-2xl p-2">
          {signupInput.gender === "FEMALE" ? (
            <AvatarFemale fill="#000" className="w-12 h-12" />
          ) : (
            <AvatarMale fill="#000" className="w-12 h-12" />
          )}
          <p className="text-sm text-gray-400">Change Avatar</p>
          <input
            type="file"
            name="profile-picture"
            id="profile-picture"
            className="hidden"
          />
        </label>
        <p className="space-y-2 px-2 py-1">
          <label htmlFor="username" className="block text-gray-600 text-sm">
            Username
          </label>
          <input
            type="username"
            name="username"
            id="username"
            className="text-sm px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
            placeholder="Username"
            value={signupInput.username}
            onChange={(e) =>
              setSignupInput({ ...signupInput, username: e.target.value })
            }
          />
          <small className="block text-red-500 text-xs">{error.username}</small>
        </p>
        <p className="space-y-2 px-2 py-1">
          <label htmlFor="email" className="block text-gray-600 text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="text-sm px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
            placeholder="Email"
            value={signupInput.email}
            onChange={(e) =>
              setSignupInput({ ...signupInput, email: e.target.value })
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
            id="password"
            className="text-sm px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
            placeholder="Password"
            value={signupInput.password}
            onChange={(e) =>
              setSignupInput({ ...signupInput, password: e.target.value })
            }
          />
          <small className="block text-red-500 text-xs">{error.password}</small>
        </p>
        <p className="space-y-2 px-2 py-1">
          <label
            htmlFor="confirm_password"
            className="block text-gray-600 text-sm"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="password"
            id="confirm_password"
            className="text-sm px-2 py-1 text-gray-500 border-gray-500 tracking-wider bg-transparent border-b-2 w-full"
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
        <p className="space-x-4">
          <label htmlFor="gender_male" className="space-x-2">
            <input
              type="radio"
              name="gender"
              id="gender_male"
              value="MALE"
              checked={signupInput.gender === "MALE"}
              onChange={genderInputHandler}
            />
            <span className="text-xs text-gray-400">Male</span>
          </label>
          <label htmlFor="gender_female" className="space-x-2">
            <input
              type="radio"
              name="gender"
              id="gender_female"
              value="FEMALE"
              checked={signupInput.gender === "FEMALE"}
              onChange={genderInputHandler}
            />
            <span className="text-xs text-gray-400">Female</span>
          </label>
        </p>
        <button
          type="submit"
          onClick={signupFormHandler}
          className="bg-primary px-4 py-2 text-white tracking-wider text-sm rounded-full"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      <p className="text-customGray text-xs p-2">
        Already have an account?{" "}
        <Link
          to="/login"
          className="inline-block text-xs text-primary underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
