import { combineReducers } from "redux";

import { reducers as coursesReducers } from "./courses";

const reducers = combineReducers({
  coursesReducers
});

export { reducers };
