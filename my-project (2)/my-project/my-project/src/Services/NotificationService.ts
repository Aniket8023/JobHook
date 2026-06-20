import axios from "axios";

const API_URL = "https://jobhook-46y3.onrender.com";

const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const token = user.jwt;

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

export const getNotifications = async (
  userId:number
) => {

  const res = await axios.get(
    `${API_URL}/notification/get/${userId}`,
    config
  );

  console.log(res.data);

  return res.data;
};

export const getAllNotifications = async (
  userId:number
) => {

  const res = await axios.get(
    `${API_URL}/notification/all/${userId}`,
    config
  );

  return res.data;
};

export const readNotification = async (
  id:string
) => {

  const res = await axios.put(
    `${API_URL}/notification/read/${id}`,
    {},
    config
  );

  return res.data;
};

