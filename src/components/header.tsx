import playIcon from '../images/Golden-Snitch.svg';
import leaderBoardIcon from '../images/Triwizard-cup.svg';
import loginIcon from '../images/Chamber-of-secrets-key.svg';
import registerIcon from '../images/quill.svg';
import hamburgerIcon from '../images/hamburger.svg';
import closeMenu from '../images/cancel.svg';
import userIcon from '../images/avatar-male.svg';
import { useState } from 'react';
import { useAuth } from '../context';
import { useNavigate, NavLink, Link } from 'react-router-dom';

export default function Header() {
  const [isNavActive, setIsNavActive] = useState(false);
  const {
    auth: { authToken },
    dispatchAuth,
  } = useAuth();
  const navigate = useNavigate();

  function logoutHandler() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    dispatchAuth({ type: 'LOGOUT_USER' });
    navigate('/');
  }

  function NavItems() {
    return (
      <nav className="flex flex-col items-center space-y-2 lg:flex-row lg:justify-between lg:w-full">
        <Link to="/" className="space-x-2 flex items-center justify-center">
          <img src={loginIcon} className="w-12" alt="logo" />
          <p className="text-3xl lg:text-xl">Brand</p>
        </Link>
        <ul className="lg:flex lg:flex-row lg:items-center space-x-4">
          <li>
            <NavLink
              end
              activeClassName="border-b-4 border-secondary"
              className="flex flex-col lg:flex-row justify-center items-center space-y-2 space-x-2 p-2"
              to="/category"
            >
              <img className="h-10 lg:h-8" src={playIcon} alt="play nav icon" />
              <p className="tracking-wider text-primary lg:text-xl">Play</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              activeClassName="border-b-4 border-secondary"
              className="flex flex-col lg:flex-row items-center space-y-2 space-x-2 p-2"
              to="/theme"
            >
              <img className="h-10 lg:h-8" src={playIcon} alt="play nav icon" />
              <p className="tracking-wider text-primary lg:text-lg">Theme</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              activeClassName="border-b-4 border-secondary"
              className="flex flex-col lg:flex-row items-center space-y-2 space-x-2 p-2"
              to="/leaderboard"
            >
              <img
                className="h-10 lg:h-8"
                src={leaderBoardIcon}
                alt="play nav icon"
              />
              <p className="tracking-wider text-primary lg:text-xl">Scores</p>
            </NavLink>
          </li>
          {authToken ? (
            <>
              <li className="flex justify-center m-6">
                <button
                  className="flex flex-col lg:flex-row items-center space-y-2"
                  onClick={logoutHandler}
                >
                  <img
                    className="h-10 lg:h-8"
                    src={loginIcon}
                    alt="user nav icon"
                  />
                  <p className="tracking-wider text-primary lg:text-xl">
                    Logout
                  </p>
                </button>
              </li>
              <li>
                <NavLink
                  end
                  activeClassName="border-b-4 border-secondary"
                  className="flex flex-col lg:flex-row items-center space-y-2 space-x-2 p-2"
                  to="/user"
                >
                  <img
                    className="h-10 lg:h-8"
                    src={userIcon}
                    alt="user nav icon"
                  />
                  <p className="tracking-wider text-primary lg:text-xl">
                    Account
                  </p>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  end
                  activeClassName="border-b-4 border-secondary"
                  className="flex flex-col lg:flex-row items-center space-y-2 space-x-2 p-2"
                  to="/login"
                >
                  <img
                    className="h-10 lg:h-8"
                    src={loginIcon}
                    alt="play nav icon"
                  />
                  <p className="tracking-wider text-primary lg:text-xl">
                    Login
                  </p>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  }

  return (
    <header className="h-10 lg:h-16 z-10 bg-white w-full fixed top-0 left-0 p-2 flex flex-row items-center shadow-md">
      <button
        className="w-6 lg:hidden"
        onClick={() => setIsNavActive(!isNavActive)}
      >
        <img src={hamburgerIcon} alt="hamburger icon" />
      </button>
      <div
        className={`${
          isNavActive ? 'block' : 'hidden'
        } z-10 lg:hidden fixed top-0 left-0 right-0 bottom-0 p-2 bg-white`}
      >
        <button
          className="w-4 m-1"
          onClick={() => setIsNavActive(!isNavActive)}
        >
          <img src={closeMenu} alt="close menu" />
        </button>
        <NavItems />
      </div>
      <div className="sm:hidden lg:block lg:w-full">
        <div className="w-4/5 mx-auto">
          <NavItems />
        </div>
      </div>
    </header>
  );
}
