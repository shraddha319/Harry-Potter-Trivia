import { ReactComponent as LeaderBoardIcon } from '../../images/Triwizard-cup.svg';
import { ReactComponent as Crown } from '../../images/crown.svg';
import { Loader } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { getLeaderboard } from '../../api';

export default function LeaderBoard() {
  const {
    dispatchAuth,
    auth: { leaderboard, user },
  } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!user) return;
      setLoading(true);
      try {
        const {
          data: {
            data: { leaderboard },
          },
          status,
        } = await getLeaderboard(user._id);
        if (status === 200) {
          dispatchAuth({ type: 'FETCH_LEADERBOARD', payload: { leaderboard } });
          console.log(leaderboard);
        }
      } catch (err) {
        if (err.response && err.response?.status === 403)
          navigate('/login', { state: { from: '/leaderboard' } });
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col h-full items-center space-y-1">
      {!leaderboard || loading ? (
        <Loader />
      ) : (
        <>
          <header className="flex flex-row justify-center items-center mt-4">
            <LeaderBoardIcon fill="#CDB750" className="w-12 h-12" />
            <h1 className="text-customGray text-bold text-lg tracking-widest uppercase">
              Leaderboard
            </h1>
          </header>
          <main className="h-full w-full space-y-4">
            {leaderboard.length > 0 && (
              <section>
                <ol className="flex flex-row items-center justify-center">
                  <li className="flex flex-col items-center m-2">
                    <Crown fill="gold" className="w-10 h-10" />
                    <p className="text-xs lg:text-lg">
                      {`${leaderboard[0]._id.firstName} ${
                        leaderboard[0]._id.lastName
                          ? leaderboard[0]._id.lastName
                          : ''
                      }`}
                    </p>
                    <p className="text-sm">Points: {leaderboard[0].points}</p>
                  </li>
                </ol>
              </section>
            )}
            <section className="bg-primary h-full w-full rounded-t-3xl text-white">
              <p className="grid grid-cols-6 grid-rows-1 px-4 py-1 text-center border-b-2 border-white text-lg">
                <p></p>
                <p className="col-span-4 py-3">User</p>
                <p className="py-3">Points</p>
              </p>
              <ol>
                {leaderboard.map(({ _id, points }, index) => (
                  <li className="grid grid-cols-6 grid-rows-1 px-4 py-1 text-center ">
                    <p className="text-bold text-xl p-2">{index + 1}</p>
                    <p className="col-span-4 py-3 text-sm">{`${_id.firstName} ${
                      _id.lastName ? _id.lastName : ''
                    }`}</p>
                    <p className="py-3 text-sm">{points}</p>
                  </li>
                ))}
              </ol>
            </section>
          </main>
        </>
      )}
    </div>
  );
}
