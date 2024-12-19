import { combineReducers } from "redux";
import { LOGOUT_SUCCESS } from "../store/types";
import logoutReducer from "./logoutReducer";
import loginReducer from "./loginReducer";
import signUpReducer from "./signUpReducer";
import getCategoriesReducer from "./getCategoriesReducer";
import getTransactionReducer from "./getTransactionReducer";

import addTransactionReducer from "./addTransactionReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const appReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  signUp: signUpReducer,
  categories: getCategoriesReducer,
  transactions: getTransactionReducer,
  addTransaction: addTransactionReducer
});
const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT_SUCCESS) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action);
};

export default rootReducer;