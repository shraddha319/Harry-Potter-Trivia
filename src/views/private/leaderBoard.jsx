import { ReactComponent as LeaderBoardIcon } from "../../images/Triwizard-cup.svg";
import avatar from "../../images/avatar-male.png";
import { ReactComponent as Crown } from "../../images/crown.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context";
import { getLeaderboard } from "../../api";

export default function LeaderBoard() {
  const {
    dispatchQuiz,
    quiz: { leaderboard },
  } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            data: { leaderboard },
          },
          status,
        } = await getLeaderboard();
        if (status === 200) {
          dispatchQuiz({ type: "SET_LEADERBOARD", payload: { leaderboard } });
          console.log(leaderboard);
        }
      } catch (err) {
        if (err.response && err.response?.status === 403)
          navigate("/login", { state: { from: "/leaderboard" } });
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col bg-primary  items-center space-y-1">
      <header className="flex flex-row justify-center items-center mt-4">
        <LeaderBoardIcon fill="#CDB750" className="w-12 h-12" />
        <h1 className="text-white text-bold text-lg tracking-widest uppercase">
          Leaderboard
        </h1>
      </header>
      <section>
        <ol className="flex flex-row items-center">
          <li className="my-4 mx-6">
            <p className="flex flex-col items-center text-white text-bold text-xl">
              2.
            </p>
            <img src={avatar} alt="second place avatar" className="w-12 h-12" />
          </li>
          <li className="flex flex-col items-center m-2">
            <Crown fill="gold" className="w-10 h-10" />
            <img src={avatar} alt="first place avatar" className="w-16 h-16" />
          </li>
          <li className="my-4 mx-6">
            <p className="flex flex-col items-center text-white text-bold text-xl">
              3.
            </p>
            <img src={avatar} alt="third place avatar" className="w-12 h-12" />
          </li>
        </ol>
      </section>
      <section className="bg-white h-auto w-full rounded-t-3xl">
        <ol>
          <li className="grid grid-cols-6 grid-rows-1 px-4 py-1 text-center">
            <p className="text-bold text-xl text-gray-500 p-2">4</p>
            <img src={avatar} className="p-1 w-auto" />
            <p className="col-span-3 py-3 text-gray-900 text-sm">Shraddha</p>
            <p className="py-3 text-gray-900 text-sm">10</p>
          </li>
          <li className="grid grid-cols-6 grid-rows-1 px-4 py-1 text-center">
            <p className="text-bold text-xl text-gray-500 p-2">5</p>
            <img src={avatar} className="p-1 w-auto" />
            <p className="col-span-3 py-3 text-gray-900 text-sm">Tanmay Jain</p>
            <p className="py-3 text-gray-900 text-sm">8</p>
          </li>
        </ol>
      </section>
    </div>
  );
}
