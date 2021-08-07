import { ReactComponent as RegisterIcon } from "../images/quill.svg";
import { ReactComponent as AvatarMale } from "../images/avatar-male1.svg";
import { ReactComponent as AvatarFemale } from "../images/avatar-female.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [genderInput, setGenderInput] = useState("male");

  function genderInputHandler(e) {
    if (e.target.checked) setGenderInput(e.target.value);
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
        className="flex flex-col items-center space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="flex flex-row items-center space-x-2 border-2 border-gray-500 rounded-2xl p-2">
          {genderInput === "female" ? (
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
        <input
          name="username"
          id="username"
          type="text"
          placeholder="Username"
          className="border-b-2 py-2 px-4 border-customGray text-xs"
        />
        <input
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          className="border-b-2 py-2 px-4 border-customGray text-xs"
        />
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          className="border-b-2 py-2 px-4 border-customGray text-xs"
        />
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Confirm Password"
          className="border-b-2 py-2 px-4 border-customGray text-xs"
        />
        <p className="space-x-4">
          <label htmlFor="gender_male" className="space-x-2">
            <input
              type="radio"
              name="gender"
              id="gender_male"
              value="male"
              checked={genderInput === "male"}
              onChange={genderInputHandler}
            />
            <span className="text-xs text-gray-400">Male</span>
          </label>
          <label htmlFor="gender_female" className="space-x-2">
            <input
              type="radio"
              name="gender"
              id="gender_female"
              value="female"
              checked={genderInput === "female"}
              onChange={genderInputHandler}
            />
            <span className="text-xs text-gray-400">Female</span>
          </label>
        </p>
        <button
          type="submit"
          className="bg-primary px-4 py-2 text-white tracking-wider text-sm rounded-full"
        >
          Register
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
