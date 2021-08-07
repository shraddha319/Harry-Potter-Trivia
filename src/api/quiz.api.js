import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export async function getQuiz() {
  return axios.get(`${apiUrl}/quiz`);
}
