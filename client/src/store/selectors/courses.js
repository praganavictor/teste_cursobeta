const courseselectors = {
  AllCourses: state => state.coursesReducers.courses,
  ActiveCourse: state => state.coursesReducers.activeCourse
};

export { courseselectors };
