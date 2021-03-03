import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import api from "../../service/api";

import { courseActions } from "../../store/actions/courses";
import { courseselectors } from "../../store/selectors/courses";

export default function Courses() {
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const history = useHistory();

  const dispatch = useDispatch();
  const allCourses = useSelector(courseselectors.AllCourses);

  useEffect(() => {
    dispatch(courseActions.setActiveCourse({}));

    async function searchCourses() {
      try {
        const response = await api.get(`/courses?page=${currentPage}`);
        setTotalPages(response.data.pages);
        dispatch(courseActions.SetCourses(response.data.docs));
      } catch (err) {
        console.log(err);
        setError("Erro ao buscar os cursos");
      }
    }
    searchCourses();
  }, [currentPage]);

  function handleSingOut() {
    history.push("/courses");
  }

  function handleNewCourse() {
    history.push("/course/new");
  }

  function handleEditCourse(course) {
    dispatch(courseActions.setActiveCourse(course));
    history.push(`/course/${course._id}/edit`);
  }

  function handleSetActiveCourse(course) {
    dispatch(courseActions.setActiveCourse(course));
  }
  async function handleDeleteCourse(course) {
    try {
      api.delete(`/course/${course._id}`);
      history.go(0);
    } catch (error) {
      console.log(error);
      setError("Erro ao buscar os cursos");
    }
  }

  // async function handlePreviousPage() {
  //   setCurrentPage(currentPage - 1);
  //   try {
  //     console.log(currentPage);
  //     const response = await api.get(`/courses?page=${currentPage}`);
  //     console.log(response);
  //     dispatch(courseActions.SetCourses(response.data.docs));
  //   } catch (err) {
  //     console.log(err);
  //     setError("Erro ao buscar os cursos");
  //   }
  // }
  // useEffect(() => {
  //   async function handleChancePage() {
  //     try {
  //       console.log(currentPage);
  //       console.log(totalPages);
  //       if (currentPage > totalPages) setCurrentPage(currentPage - 1);
  //       const response = await api.get(`/courses?page=${currentPage}`);
  //       console.log(response);
  //       dispatch(courseActions.SetCourses(response.data.docs));
  //     } catch (err) {
  //       console.log(err);
  //       setError("Erro ao buscar os cursos");
  //     }
  //   }
  //   handleChancePage();
  // }, [currentPage]);

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
                <button onClick={() => handleEditCourse(course)}>Edit</button>
                <button onClick={() => handleDeleteCourse(course)}>
                  Delete
                </button>
                <hr />
              </div>
            ))}
        </section>
        <hr />
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Back page
        </button>
        {currentPage} de {totalPages}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next page
        </button>
      </div>
    </>
  );
}
