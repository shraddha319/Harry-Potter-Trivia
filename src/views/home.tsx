import { Link } from "react-router-dom";
import hogwartsLogo from "../images/hogwarts-logo.svg";
import { useAuth } from "../context";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="overflow-hidden p-4">
      <section className="hero container h-full mx-auto flex lg:flex-row justify-center items-center lg:space-x-10 sm:flex-col">
        <div className="space-y-10">
          <h1 className="text-4xl text-center lg:text-7xl text-gold leading-tight">
            Harry Potter Trivia
          </h1>
          <div className="sm:hidden lg:block">
            <Link
              to="/login"
              className="bg-red-700 hover:bg-red-600 border-2 text-white py-3 px-4 rounded m-2 text-2xl"
            >
              Join Now
            </Link>
            <Link
              to="/category"
              className="inline-block bg-customGray border-white border-2 text-white py-3 px-4 rounded m-2 text-2xl"
            >
              Start right away!
            </Link>
          </div>
        </div>
        <img
          className="lg:w-72 sm:w-auto"
          src={hogwartsLogo}
          alt="hogwarts logo"
        />
        <div className="lg:hidden flex flex-col items-center space-y-4 my-4">
          {isLoggedIn ? (
            <Link
              to="/category"
              className="bg-primary hover:bg-red-600 text-white py-2 px-4 rounded text-sm m-1"
            >
              Start
            </Link>
          ) : (
            <>
              <p>
                <Link
                  to="/login"
                  className="bg-primary hover:bg-red-600 text-white py-2 px-4 rounded text-sm m-1"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="border-secondary bg-secondary border-2 text-white py-2 px-4 rounded text-sm m-1"
                >
                  Register
                </Link>
              </p>
              <Link
                to="/category"
                className="block text-xs text-customGray underline hover:text-primary m-1"
              >
                Continue As Guest
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
