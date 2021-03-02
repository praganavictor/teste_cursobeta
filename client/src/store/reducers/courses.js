import { actionsTypes } from "../constants/courses";

const INITIAL_STATE = {
  courses: [],
  activeCourse: {}
};

const reducers = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case actionsTypes.SET_COURSES:
      return {
        ...state,
        courses: payload
      };

    case actionsTypes.TOGGLE_SEARCH:
      state.courses = state.courses.filter(
        course =>
          course.nome.toLowerCase().indexOf(payload.toLowerCase()) !== -1
      );
      return { ...state };

    case actionsTypes.SET_ACTIVE_COURSE:
      return { activeCourse: payload };

    default:
      return state;
  }
};

export { reducers };
