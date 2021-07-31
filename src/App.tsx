import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Category,
  Instruction,
  Quiz,
  Score,
  House,
  LeaderBoard,
  Login,
  Signup,
} from "./views/index";
import { Header } from "./components/index";

export default function App() {
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
          <Route path="/theme" element={<House />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </div>
  );
}
