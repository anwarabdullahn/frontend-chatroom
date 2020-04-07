import api from "../utils/api";

export const loginUser = async (data) => {
  const { email, name } = data;
  const result = await api.post('/login', data = { email, name });
  return result;
}

export const registerUser = async (data) => {
  const { email, name } = data;
  const result = await api.post('/register', data = { email, name });
  return result;
}