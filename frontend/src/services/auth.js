import { authApi } from "./api";

export const registerUser = (data) => {
  return authApi.post("/auth/register", data);
};

export const loginUser = (data) => {
  return authApi.post(
    "/auth/login",
    new URLSearchParams(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};
