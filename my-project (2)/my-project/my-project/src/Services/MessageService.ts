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

export const sendMessage = async (data:any) => {

  const res = await axios.post(
    `${API_URL}/messages/send`,
    data,
    config
  );

  return res.data;
};

export const getConversation = async (
  senderId:number,
  receiverId:number
) => {

  const res = await axios.get(
    `${API_URL}/messages/${senderId}/${receiverId}`,
    config
  );

  return res.data;
};

export const getAllUserMessages = async (
  profileId:number
) => {

  const res = await axios.get(
    `${API_URL}/messages/user/${profileId}`
  );

  return res.data;
};