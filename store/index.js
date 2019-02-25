import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import allReducers from '../reducers/index.js';
import slimAsync from 'redux-slim-async';
import { githubFetchMiddleware } from "../middleware";

const store = createStore(
  allReducers,
  compose(applyMiddleware(slimAsync)),
);

export default store;
