import axios from "axios";
import { authHeader } from "../helpers";

export const dateOffService = {
  createDateOff,
  getWaitingDateOff,
  getAcceptDateOff,
  deleteDateOff
};
function createDateOff(dateOff) {
  return axios.post("/api/day-offs", dateOff, {
    headers: authHeader()
  });
}
function getWaitingDateOff() {
  return axios.get("/api/day-offs/user", {
    headers: authHeader()
  });
}

function getAcceptDateOff() {
  return axios.get("/api/day-offs/user/approved", {
    headers: authHeader()
  });
}

function deleteDateOff(id) {
  return axios.delete(`/api/day-offs/${id}`, {
    headers: authHeader()
  });
}
