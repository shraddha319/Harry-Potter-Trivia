import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
// import { QuizProvider, AuthProvider } from "./context";
import { QuizProvider, AuthProvider, UserProvider } from './contexts';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QuizProvider>
        <UserProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </UserProvider>
      </QuizProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
