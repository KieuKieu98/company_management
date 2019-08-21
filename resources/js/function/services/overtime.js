import axios from "axios";
import { authHeader } from "../helpers";

export const overtimeService = {
  getTeam,
  createTeam,
  addMember,
  getMember,
  deleteMember,
  deleteTeam,
  getOne,
  addOvertime,
  getMemberInTeam,
  getMemberInTeamOT,
  getAllOT,
  getOTMember,
  updateOvertime,
  getOneMemberInTeamOT
};

function getTeam() {
  return axios.get(`/api/teams`, {
    headers: authHeader()
  });
}

function getOne(id) {
  return axios.get(`/api/team/${id}/members`, {
    headers: authHeader()
  });
}

function getMember(id, key) {
  return axios.post(
    `/api/team/${id}/member-search`,
    { key },
    {
      headers: authHeader()
    }
  );
}

function createTeam(name) {
  return axios.post(
    "/api/teams",
    { name },
    {
      headers: authHeader()
    }
  );
}
function addMember(data, id) {
  return axios.post(`/api/team/${id}/add-member`, data, {
    headers: authHeader()
  });
}

function deleteMember(id, idU) {
  return axios.delete(`/api/team/${id}/delete-member/${idU}`, {
    headers: authHeader()
  });
}
function deleteTeam(id) {
  return axios.delete(`/api/teams/${id}`, {
    headers: authHeader()
  });
}

function addOvertime(data, id) {
  return axios.post(`/api/team/${id}/member/add-ot`, data, {
    headers: authHeader()
  });
}

function getMemberInTeam(id, key) {
  return axios.post(
    `/api/team/${id}/member-search-team`,
    { key },
    {
      headers: authHeader()
    }
  );
}

function getMemberInTeamOT(id, pageNumber) {
  return axios.get(`/api/team/${id}/members/OTs?page=` + pageNumber, {
    headers: authHeader()
  });
}

function getAllOT(params) {
  return axios.post(`/api/members/OTs`, params, { headers: authHeader() });
}

function getOTMember(pageNumber) {
  return axios.get(`/api/member/OTs?page=` + pageNumber, {
    headers: authHeader()
  });
}

function updateOvertime(id, data) {
  let formData = new FormData();
  Object.entries(data).forEach(d => {
    formData.append(d[0], d[1]);
  });
  return axios.post(`/api/OTs/edit/${id}`, formData, {
    headers: authHeader()
  });
}

function getOneMemberInTeamOT(id) {
  return axios.get(`/api/member/OTs/${id}`, {
    headers: authHeader()
  });
}
