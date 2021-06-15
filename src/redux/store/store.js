import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { notes } from "../reducers/notes";

let middlewares = [thunk];

const reducers = combineReducers({
  notes,
});
const store = createStore(reducers, applyMiddleware(...middlewares));
export default store;
