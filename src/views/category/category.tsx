import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuiz } from "../../context/quiz";
import cat from "../../images/quidditch-cat.svg";
import { ReactComponent as LeaderBoardIcon } from "../../images/Triwizard-cup.svg";

export default function Category() {
  const {
    quiz: { quizData },
    dispatchQuiz,
  } = useQuiz();

  const navigate = useNavigate();

  // function continueClickHandler() {
  //   if (username !== "") {
  //     dispatchQuiz({ type: "SET_USERNAME", payload: { username } });
  //     navigate("/instruction");
  //   }
  // }

  return (
    <div className="space-y-6 p-4">
      <section>
        <h1 className="text-lg mx-2 my-1">Welcome back!</h1>
      </section>
      <section className="space-y-3">
        <header className="space-x-1 space-y-1 w-auto">
          <div className="h-0.5 rounded w-5 bg-primary"></div>
          <h2 className="text-sm text-primary font-semibold tracking-widest">
            Play
          </h2>
        </header>
        <div className="flex flex-row">
          {quizData.categories.map((category) => (
            <button
              onClick={() => {
                dispatchQuiz({
                  type: "SET_QUIZ_CATEGORY",
                  payload: { category },
                });
                navigate("/instruction");
              }}
              className="flex flex-col justify-center p-2 rounded bg-primary mx-1 space-y-2 hover:bg-red-700"
            >
              <img className="w-12" src={cat} alt="cat" />
              <p className="text-white tracking-wider text-xs">
                {category.category}
              </p>
            </button>
          ))}
        </div>
      </section>
      <section className="space-y-3">
        <header className="space-x-1 space-y-1 w-auto">
          <div className="h-0.5 rounded w-5 bg-primary"></div>
          <h2 className="text-sm text-primary font-semibold tracking-widest">
            Scores
          </h2>
        </header>
        <div className="grid grid-cols-2 gap-2 grid-rows-2 h-28">
          <div className="container row-span-2 bg-customGray rounded text-white p-1 flex flex-row justify-center items-center">
            <LeaderBoardIcon className="w-18 p-1 h-full" fill="#fff" />
            <div className="text-center tracking-widest m-1">
              <p className="uppercase p-1 font-semibold text-sm">Top Score</p>
              <strong className="m-1 text-3xl">10</strong>
            </div>
          </div>
          <div className="bg-gold text-center rounded text-white tracking-normal flex flex-row items-center px-3">
            <p className="text-sm font-semibold">Your Top Score</p>
            <strong className="m-1 text-3xl">9</strong>
          </div>
          <div>
            <Link
              to="/leaderboard"
              className="border-2 border-customGray text-customGray rounded p-2 m-1 text-sm hover:text-primary hover:border-primary"
            >
              Leader Board
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* <input
                onChange={() =>
                  dispatchQuiz({
                    type: "SET_QUIZ_CATEGORY",
                    payload: { category },
                  })
                }
                type="radio"
                name="quiz-category"
                value={category.category}
                id={category.category}
              />
              <label
                className="flex flex-row justify-center items-center p-1 space-x-1 rounded-2xl bg-red-700"
                htmlFor={category.category}
              >
                <img className="w-1/2" src={cat} alt="cat" />
                <span className="text-white">{category.category}</span>
              </label> */
