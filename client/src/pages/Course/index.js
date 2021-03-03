import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import api from "../../service/api";

import { courseActions } from "../../store/actions/courses";
import { courseselectors } from "../../store/selectors/courses";

export default function Courses() {
  const [error, setError] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const allCourses = useSelector(courseselectors.AllCourses);
  const activeCourse = useSelector(courseselectors.ActiveCourse);

  useEffect(() => {
    dispatch(courseActions.setActiveCourse({}));
    dispatch(courseActions.SetCourses());

    async function searchCourses() {
      try {
        const response = await api.get("/courses");
        console.log(response);
        dispatch(courseActions.SetCourses(response.data.docs));
      } catch (err) {
        console.log(err);
        setError("Erro ao buscar os cursos");
      }
    }
    searchCourses();
  }, [dispatch]);

  function handleSingOut() {
    history.push("/courses");
  }

  function handleNewCourse() {
    history.push("/course/new");
  }

  function handleSetActiveCourse(course) {
    dispatch(courseActions.setActiveCourse(course));
  }

  console.log(activeCourse);
  return (
    <>
      <div>
        {error && <p>{error}</p>}
        <section>
          <button onClick={handleSingOut}>Sair</button>
          <h1>Cursos</h1>
          <button onClick={handleNewCourse}>Novo Curso</button>
          <hr />
          {allCourses &&
            allCourses.map(course => (
              <div key={course._id}>
                <Link
                  onClick={() => handleSetActiveCourse(course)}
                  to={`course/${course._id}`}
                >
                  <h4>{course.nome}</h4>
                  <h5>{course.categoria}</h5>
                  <p>{course.descricao}</p>
                </Link>
                <hr />
              </div>
            ))}
        </section>
      </div>
    </>
  );
}
