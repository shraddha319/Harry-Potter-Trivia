import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
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
} from "./views/index";
import { Header, PrivateRoute } from "./components/index";
import { useAuth } from "./context";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="font-filsonMedium w-screen h-screen">
      <Header />
      <main className="mt-10 h-full w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/instruction" element={<Instruction />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/score" element={<Score />} />
          <PrivateRoute path="/theme" element={<Theme />} />
          <PrivateRoute path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}
