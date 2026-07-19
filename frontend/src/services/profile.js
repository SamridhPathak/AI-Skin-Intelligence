import { profileApi } from "./api";

export const getMyProfile = () => {
  return profileApi.get("/profile/me");
};

export const createProfile = (data) => {
  return profileApi.post("/profile/create", data);
};
