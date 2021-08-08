import API from "./config.api";

export async function registerUser(user) {
  return API.post("/user", { user });
}

export async function verifyIfAvailable({ key, value }) {
  return API.head("/user", {
    headers: { key, value },
  });
}

export async function loginUser(credentials) {
  return API.post("/auth/login", { ...credentials });
}
