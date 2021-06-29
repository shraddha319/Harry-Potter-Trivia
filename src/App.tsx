import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Home, Instruction, Quiz, Score } from "./views/index";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/instruction" element={<Instruction />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/score" element={<Score />}></Route>
      </Routes>
    </div>
  );
}
