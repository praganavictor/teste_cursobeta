import { actionsTypes } from "../constants/courses";

const courseActions = {
  SetEvents: payload => ({
    payload,
    type: actionsTypes.SET_COURSES
  }),
  setActiveEvent: payload => ({
    payload,
    type: actionsTypes.SET_ACTIVE_COURSE
  })
};

export { courseActions };
