import { ReactComponent as LeaderBoardIcon } from '../../images/Triwizard-cup.svg';
import { Loader } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { getUserHistory } from '../../api';

export default function UserHistory() {
  const {
    dispatchAuth,
    auth: { history, user },
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
            data: { scores },
          },
          status,
        } = await getUserHistory(user._id);
        if (status === 200) {
          dispatchAuth({
            type: 'FETCH_USER_HISTORY',
            payload: { history: scores },
          });
          console.log(scores);
        }
      } catch (err) {
        if (err.response && err.response?.status === 403)
          navigate('/login', { state: { from: '/history' } });
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col h-full items-center space-y-1">
      {!history || loading ? (
        <Loader />
      ) : (
        <>
          <header className="flex flex-row justify-center items-center mt-4">
            <LeaderBoardIcon fill="#CDB750" className="w-12 h-12" />
            <h1 className="text-customGray text-bold text-lg tracking-widest uppercase">
              Player History
            </h1>
          </header>
          {history.length === 0 ? (
            <h1>No records found</h1>
          ) : (
            <main className="h-full w-full space-y-4">
              <section className="bg-primary h-full w-full rounded-2xl text-white">
                <p className="grid grid-cols-3 grid-rows-1 px-2 py-1 text-center border-b-2 border-white">
                  <p className="col-span-2 py-3 text-sm">Quiz</p>
                  <p className="py-3 text-sm">Score</p>
                </p>
                <ol>
                  {history.map(({ quiz, score }) => (
                    <li className="grid grid-cols-3 grid-rows-1 px-4 py-1 text-center">
                      <p className="col-span-2 py-3 text-sm">{quiz.name}</p>
                      <p className="py-3 text-sm">{score}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </main>
          )}
        </>
      )}
    </div>
  );
}
