import { createContext, useReducer, useContext, useEffect } from 'react';
import { QuizState, QuizContextType } from './types/quiz.types';
import { quizReducer } from './reducers/quiz.reducer';
import { getQuiz } from '../api';

const initialQuiz: QuizState = {
  quizData: null,
  session: null,
  username: 'anon' || null,
  theme: localStorage.getItem('theme') || 'gryffindor',
};

const QuizContext = createContext<QuizContextType>({
  quiz: initialQuiz,
  dispatchQuiz: () => undefined,
});

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [quiz, dispatchQuiz] = useReducer(quizReducer, initialQuiz);

  useEffect(() => {
    if (quiz.quizData) return;
    (async () => {
      try {
        const {
          data: {
            success,
            data: { quiz },
          },
        } = await getQuiz();
        if (success)
          dispatchQuiz({ type: 'FETCH_QUIZ', payload: { categories: quiz } });
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
        console.log(error);
      }
    })();
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
