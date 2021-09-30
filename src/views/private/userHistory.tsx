import { ReactComponent as PlayerScores } from '../../images/Quidditch-goals.svg';
import { Loader } from '../../components';
import { useEffect } from 'react';
import { useUser, fetchUserScores } from '../../contexts';

export default function UserHistory() {
  const {
    dispatchUser,
    user: {
      profile,
      scores: { scores, status },
    },
  } = useUser();

  useEffect(() => {
    if (status === 'idle' && profile)
      fetchUserScores(dispatchUser, profile._id);
  }, []);

  return (
    <div className="flex flex-col h-full items-center space-y-2 lg:space-y-4">
      {status !== 'success' ? (
        <Loader />
      ) : (
        <>
          <header className="flex flex-row justify-center items-center mt-4 space-x-4">
            <PlayerScores fill="#CDB750" className="w-12 h-12" />
            <h1 className="text-customGray text-bold text-lg tracking-widest uppercase">
              Player History
            </h1>
          </header>
          {scores.length === 0 ? (
            <h1>No records found</h1>
          ) : (
            <main className="h-full w-full space-y-4">
              <section className="bg-primary h-full w-full rounded-2xl text-white">
                <p className="grid grid-cols-3 grid-rows-1 px-2 py-1 text-center border-b-2 border-white">
                  <p className="col-span-2 py-3 text-sm">Quiz</p>
                  <p className="py-3 text-sm">Score</p>
                </p>
                <ol>
                  {scores.map(({ quiz, score }) => (
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
