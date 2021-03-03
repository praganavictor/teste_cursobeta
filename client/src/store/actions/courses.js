import { actionsTypes } from "../constants/courses";

const courseActions = {
  SetCourses: payload => ({
    payload,
    type: actionsTypes.SET_COURSES
  }),
  setActiveCourse: payload => ({
    payload,
    type: actionsTypes.SET_ACTIVE_COURSE
  })
};

export { courseActions };
