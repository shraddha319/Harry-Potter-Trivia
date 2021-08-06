import playIcon from "../images/Golden-Snitch.svg";
import leaderBoardIcon from "../images/Triwizard-cup.svg";
import loginIcon from "../images/Chamber-of-secrets-key.svg";
import registerIcon from "../images/quill.svg";
import hamburgerIcon from "../images/hamburger.svg";
import closeMenu from "../images/cancel.svg";
import { useState } from "react";

export default function Header() {
  const [isNavActive, setIsNavActive] = useState(false);

  return (
    <header className="h-10 z-10 bg-white w-full fixed top-0 left-0 p-2 flex flex-row items-center shadow-md">
      <button className="w-6" onClick={() => setIsNavActive(!isNavActive)}>
        <img src={hamburgerIcon} alt="hamburger icon" />
      </button>
      <div
        className={`${
          isNavActive ? "block" : "hidden"
        } z-10 fixed top-0 bottom-0 left-0 right-0 p-2 bg-white`}
      >
        <button
          className="w-4 m-1"
          onClick={() => setIsNavActive(!isNavActive)}
        >
          <img src={closeMenu} alt="close menu" />
        </button>
        <div className="m-7 space-x-2 flex justify-center items-center">
          <img src={loginIcon} className="w-12" alt="logo" />
          <p className="text-3xl">Brand</p>
        </div>
        <nav>
          <ul>
            <li>
              <a className="flex flex-col items-center m-6 space-y-2" href="/">
                <img className="w-10" src={playIcon} alt="play nav icon" />
                <p className="uppercase tracking-wider text-primary">Play</p>
              </a>
            </li>
            <li>
              <a
                className="flex flex-col items-center m-6 space-y-2"
                href="/leaderboard"
              >
                <img
                  className="w-10"
                  src={leaderBoardIcon}
                  alt="play nav icon"
                />
                <p className="uppercase tracking-wider text-primary">
                  Leader Board
                </p>
              </a>
            </li>
            <li>
              <a
                className="flex flex-col items-center m-6 space-y-2"
                href="/login"
              >
                <img className="w-10" src={loginIcon} alt="play nav icon" />
                <p className="uppercase tracking-wider text-primary">Login</p>
              </a>
            </li>
            <li>
              <a
                className="flex flex-col items-center m-6 space-y-2"
                href="/signup"
              >
                <img className="w-10" src={registerIcon} alt="play nav icon" />
                <p className="uppercase tracking-wider text-primary">
                  Register
                </p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
