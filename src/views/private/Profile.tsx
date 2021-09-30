import { Loader } from '../../components';
import { useAuth, useUser, editProfile, useQuiz } from '../../contexts';
import { useState } from 'react';
import { editProfileValidationRules, validate } from '../../lib';
import { useNavigate } from 'react-router-dom';
import loginIcon from '../../images/Chamber-of-secrets-key.svg';
import { FormInput, FormError } from '../../types/form.types';

export default function Profile() {
  const navigate = useNavigate();
  const { dispatchAuth } = useAuth();
  const {
    dispatchUser,
    user: { profile: user },
  } = useUser();
  const { dispatchQuiz } = useQuiz();
  const [loading, setLoading] = useState({
    logout: false,
    edit: false,
  });
  const [signupInput, setSignupInput] = useState<FormInput>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
  });
  const [formError, setFormError] = useState<FormError>({
    firstName: '',
    lastName: '',
  });
  const [edit, setEdit] = useState(false);

  function logoutHandler() {
    setLoading({ ...loading, logout: true });
    dispatchUser({ type: 'LOGOUT_USER' });
    dispatchAuth({ type: 'LOGOUT_AUTH' });
    dispatchQuiz({ type: 'REMOVE_LEADERBOARD' });
    localStorage.removeItem('authToken');
    setLoading({ ...loading, logout: false });
    navigate('/');
  }

  async function editProfileHandler() {
    if (!user) return;
    if (!edit) setEdit(true);
    else {
      setLoading({ ...loading, edit: true });
      const validationError = validate(signupInput, editProfileValidationRules);
      setFormError({ ...formError, ...validationError });

      if (Object.keys(validationError).length === 0) {
        const reqBody: {
          firstName?: string;
          lastName?: string;
        } = Object.keys(signupInput).reduce((obj: FormInput, key) => {
          if (signupInput[key] !== '') obj[key] = signupInput[key];
          return obj;
        }, {});
        await editProfile(dispatchUser, user._id, reqBody);
        setLoading({ ...loading, edit: false });
        setEdit(false);
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
          onClick={editProfileHandler}
          className="bg-secondary px-4 py-2 text-white tracking-wider text-xs rounded-full lg:text-sm"
        >
          {loading.edit ? 'Loading...' : edit ? 'Save' : 'Edit'}
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
              value={signupInput.firstName}
              onChange={(e) =>
                setSignupInput({ ...signupInput, firstName: e.target.value })
              }
            />
            <small className="block text-red-500 text-xs">
              {formError.firstName}
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
              value={signupInput.lastName}
              onChange={(e) =>
                setSignupInput({ ...signupInput, lastName: e.target.value })
              }
            />
            <small className="block text-red-500 text-xs">
              {formError.lastName}
            </small>
          </p>
          {/* <p className="space-y-2 w-full">
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
              value={signupInput.email}
              onChange={(e) =>
                setSignupInput({ ...signupInput, email: e.target.value })
              }
            />
            <small className="block text-red-500 text-xs">
              {formError.email}
            </small>
          </p> */}
        </form>
      )}
      <button
        className="flex flex-col lg:flex-row items-center space-y-2"
        onClick={logoutHandler}
      >
        <img className="h-10 lg:h-8" src={loginIcon} alt="user nav icon" />
        <p className="tracking-wider text-primary lg:text-xl">
          {loading.logout ? 'Loading...' : 'Logout'}
        </p>
      </button>
    </div>
  );
}
