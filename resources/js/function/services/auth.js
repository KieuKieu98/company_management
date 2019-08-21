import axios from "axios";

export const authService = {
  login,
  logout,
  sendEmail,
  resetPassword,
  validationToken
};

function login(email, password) {
  return axios
    .post(
      "/api/login",
      {
        email: email,
        password: password
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function sendEmail(email) {
  return axios.post("/api/send-email", { email });
}

function validationToken(token) {
  return axios.get(`/api/change-password/${token}`, { token });
}

function resetPassword(token, new_password) {
  return axios.post(`/api/change-password/${token}`, { token, new_password });
}

function logout() {
  // remove user from local storage to log user out
  // return axios.post(`/api/logout`, { token });
  localStorage.removeItem("user");
}
