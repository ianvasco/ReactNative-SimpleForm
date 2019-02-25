import { FETCH_SUCCESS, FETCH_ERROR, FETCH_PENDING } from "../constants/action-types";

function createSlimAsyncMiddleware({ dispatch, getState }) {
  //uses SlymAsync for reducing boilerplate middleware.
  return next => action => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
    } = action;
    if (!actionIsValid(action)) next(action);
    if (!shouldCallAPI(getState())) {
      return Promise.resolve(getState());
    }
    const [pendingType, successType, errorType] = types;
    dispatch({ type: pendingType });
    return callAPI()
      .then(response => {
        dispatch({
          type: successType,
          payload: response,
        });
        return Promise.resolve(getState());
      })
      .catch(error => {
        dispatch({
          type: errorType,
          payload: error,
        });
        return Promise.reject(error);
     });
  };
}
