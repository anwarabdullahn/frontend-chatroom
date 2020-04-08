import api from "../../utils/api";

export const loginUser = async (data) => {
  const result = await api('/login', 'post', data);
  return result;
}

export const registerUser = async (data) => {
  const result = await api('/register', 'post', data);
  return result;
}