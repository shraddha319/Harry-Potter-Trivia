import API from "./config.api";

export async function getQuiz() {
  return API.get("/quiz");
}
