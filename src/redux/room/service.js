import api from "../../utils/api";

export const createRoom = async (data) => {
  const result = await api('/room', 'post', { name: data.payload.name });
  return result;
}

export const getRoom = async (pageNumber) => {
  const result = await api(`/room/${pageNumber}`, 'get')
  return result;
}

export const joinRoom = async (data) => {
  const result = await api('/room/join', 'post', { name: data.payload.name });
  return result;
}

export const roomMessage = async (data, pageNumber = 1) => {
  const roomId = data.payload._id;
  const result = await api(`/msg/${roomId}/${pageNumber}`, 'get');
  return result;
}

export const sendMessage = async (data) => {
  const { text, roomId } = data.payload
  const result = await api(`/msg/${roomId}`, 'post', { text });
  return result;
}
