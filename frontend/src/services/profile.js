import axios from "axios";

const API = "http://127.0.0.1:8002";

export const getMyProfile = () => {
  return axios.get(`${API}/profile/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const createProfile = (data) => {
  return axios.post(
    `${API}/profile/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};