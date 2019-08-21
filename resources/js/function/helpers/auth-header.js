export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.data.token) {
    return ({
      Authorization: "Bearer " + user.data.token,
      "Content-Type": "application/json"
    })
  } else {
    return {};
  }
}
