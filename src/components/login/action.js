/*
 * action types
 */

export const LOGIN = "LOGIN";

/*
 * action creators
 */

export function login(username, password) {
  console.log(username, password);
  return { type: LOGIN, username, password };
}
