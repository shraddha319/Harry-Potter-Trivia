import API from "./config.api";

export async function getLeaderboard() {
  return API.get("/history", { params: { type: "leaderboard" } });
}

export async function postUserScore(data) {
  return API.post("/history", { ...data });
}
