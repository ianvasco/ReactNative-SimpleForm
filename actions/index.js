import { ADD_FORM, GITHUB_LOADED, FETCH_ERROR, FETCH_PENDING, FETCH_SUCCESS }
  from "../constants/action-types";


export function addForm(payload) {
  return { type: ADD_FORM, payload }
};

export function fetchData(user) {

  const baseUrl = 'https://api.github.com/users/';
  const url = baseUrl+user;
  const repoUrl = url+"/repos";
  return {
    types: [
      FETCH_PENDING,
      FETCH_SUCCESS,
      FETCH_ERROR,
    ],
    callAPI: () => fetch(repoUrl)
      .then(res => res.json()),
  }
}
