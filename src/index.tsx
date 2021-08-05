import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QuizProvider, AuthProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <QuizProvider>
          <App />
        </QuizProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
