import { reducer as formReducer } from 'redux-form';
import { ADD_FORM, GITHUB_LOADED, FETCH_REQUEST, FETCH_ERROR, FETCH_SUCCESS }
  from "../constants/action-types";
import {combineReducers} from 'redux';

const initialState = {
  date: '20-03-2002',
  githubData: [],
  candidateGithub: [],
  candidateForm: [],
  data: []
};
function rootReducer(state = initialState, action) {

  if (action.type === ADD_FORM) {
    return Object.assign({}, state, {
      candidateForm: state.candidateForm.concat(action.payload)
    });
  }
  if (action.type === FETCH_SUCCESS){
    return Object.assign({}, state, {
          githubData: state.githubData.concat(action.payload)
        });
  }
  if (action.type === FETCH_REQUEST){
    return state;
  }
  if (action.type === FETCH_ERROR){}

  return state;
}

const reducers = {
  form: formReducer,
  data: rootReducer
}
const allReducers= combineReducers(reducers);
export default allReducers;
