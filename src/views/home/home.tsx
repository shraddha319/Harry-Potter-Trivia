import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/quiz";

// static assets
import "./home.scss";

export default function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { dispatchQuiz } = useQuiz();

  function continueClickHandler() {
    if (username !== "") {
      dispatchQuiz({ type: "SET_USERNAME", payload: { username } });
      navigate("/instruction");
    }
  }

  return (
    <div className="home layout--center">
      <h1 className="home__title">Harry Potter Trivia</h1>
      <div>
        <label>To play anonymously, enter username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button onClick={continueClickHandler}>continue</button>
    </div>
  );
}
