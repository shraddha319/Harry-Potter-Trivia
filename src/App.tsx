import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Category,
  Instruction,
  Quiz,
  Score,
  Theme,
  LeaderBoard,
  Login,
  Signup,
} from './views';
import { Header, PrivateRoute } from './components';
import { useQuiz } from './context';

export default function App() {
  const {
    quiz: { theme },
  } = useQuiz();

  return (
    <div className={`App font-filsonMedium w-screen h-screen ${theme}`}>
      <Header />
      <main className="h-full sm:mt-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/instruction" element={<Instruction />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/score" element={<Score />} />
          <Route path="/theme" element={<Theme />} />
          <PrivateRoute path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}
