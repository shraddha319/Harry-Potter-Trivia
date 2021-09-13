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
  UserHistory,
  Login,
  Signup,
  Profile,
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
          <Route
            path="/category/:categoryId/instruction"
            element={<Instruction />}
          />
          <Route path="/category/:categoryId/play" element={<Quiz />} />
          <Route path="/category/:categoryId/score" element={<Score />} />
          <Route path="/theme" element={<Theme />} />
          <PrivateRoute path="/scores" element={<UserHistory />} />
          <PrivateRoute path="/leaderboard" element={<LeaderBoard />} />
          <PrivateRoute path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}
