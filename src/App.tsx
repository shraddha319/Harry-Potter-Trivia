import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Home, Category, Instruction, Quiz, Score } from "./views/index";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/instruction" element={<Instruction />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </div>
  );
}
