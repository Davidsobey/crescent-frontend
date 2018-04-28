export default function AuthHeader() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user')); // eslint-disable-line no-undef

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}
