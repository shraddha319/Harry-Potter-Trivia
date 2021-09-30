import { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchQuiz } from './services';
import { quizReducer } from './reducer';
import { QuizContextType, QuizState } from './types';

const initialState: QuizState = {
  quiz: {
    status: 'idle',
    error: null,
    data: null,
  },
  session: null,
  leaderboard: {
    status: 'idle',
    error: null,
    data: null,
  },
  username: 'anon' || null,
  theme: localStorage.getItem('theme') || 'gryffindor',
};

const QuizContext = createContext<QuizContextType>({
  quiz: initialState,
  dispatchQuiz: () => undefined,
});

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [quiz, dispatchQuiz] = useReducer(quizReducer, initialState);

  useEffect(() => {
    fetchQuiz(dispatchQuiz);
  }, []);

  return (
    <QuizContext.Provider value={{ quiz, dispatchQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextType {
  return useContext(QuizContext);
}
