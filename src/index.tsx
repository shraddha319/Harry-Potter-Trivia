import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { QuizProvider } from "./context/quiz";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QuizProvider>
        <App />
      </QuizProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
