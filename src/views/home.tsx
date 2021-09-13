import { Link } from 'react-router-dom';
import hogwartsLogo from '../images/hogwarts-logo.svg';
import { useAuth } from '../context';

export default function Home() {
  const {
    auth: { authToken },
  } = useAuth();
  // TODO: fix hogwarts logo in mobile screen
  return (
    <div className="overflow-hidden p-4">
      <section className="hero container h-full mx-auto flex lg:flex-row lg:flex-wrap justify-center items-center lg:space-x-10 sm:flex-col">
        <h1 className="text-4xl text-center lg:text-6xl text-customGray leading-tight">
          Harry Potter Trivia
        </h1>

        <img
          className="lg:w-64 sm:w-24"
          src={hogwartsLogo}
          alt="hogwarts logo"
        />
        <div className="flex flex-col items-center space-y-4 my-4">
          {authToken ? (
            <Link
              to="/category"
              className="bg-primary hover:bg-red-600 text-white py-2 px-4 rounded text-sm m-1"
            >
              Start
            </Link>
          ) : (
            <>
              <p className="lg:mb-3">
                <Link
                  to="/login"
                  className="bg-primary hover:bg-red-600 text-white py-2 px-4 rounded text-sm m-1 lg:text-2xl lg:m-4"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="border-secondary bg-secondary border-2 text-white py-2 px-4 rounded text-sm m-1 lg:text-2xl lg:m-4"
                >
                  Register
                </Link>
              </p>
              <Link
                to="/category"
                className="block text-xs text-customGray underline hover:text-primary m-1 lg:text-lg"
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
