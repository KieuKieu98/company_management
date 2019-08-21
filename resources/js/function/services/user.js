import axios from "axios";
import { authHeader } from "../helpers";

export const userService = {
  getAll,
  getOne,
  updateUser,
  createUser,
  deleteUser
};

function getAll(pageNumber) {
  return axios.get(`/api/users?page=` + pageNumber, {
    headers: authHeader()
  });
}

function getOne(id) {
  return axios.get(`/api/users/${id}`, {
    headers: authHeader()
  });
}

function createUser(data) {
  let formData = new FormData();
  Object.entries(data).forEach(d => {
    formData.append(d[0], d[1]);
  });
  return axios.post("/api/users", formData, {
    headers: authHeader()
  });
}

function deleteUser(id) {
  return axios.delete(`/api/users/${id}`, {
    headers: authHeader()
  });
}

function updateUser(user_fields) {
  // const fd = new formData();
  // fd.append("image", user_fields.avatar, user_fields.avatar.name);
  let formData = new FormData();
  Object.entries(user_fields).forEach(d => {
    formData.append(d[0], d[1]);
  });
  return axios.post(`/api/users/${user_fields.id}`, formData, {
    headers: authHeader()
  });
}
