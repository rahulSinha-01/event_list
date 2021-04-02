import { combineReducers } from "redux";

const tokenReducer = (state = "", action) => {
  if (action.type === "TOKEN_SAVE") {
    return action.payload;
  }
  return state;
};

const userReducer = (state = {}, action) => {
  if (action.type === "USER_SAVE") {
    return action.payload;
  }
  return state;
};

export default combineReducers({
  token: tokenReducer,
  user: userReducer,
});
