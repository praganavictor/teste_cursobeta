import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import api from "../../service/api";

import "./main.css";

import { courseActions } from "../../store/actions/courses";
import { courseselectors } from "../../store/selectors/courses";

export default function Courses() {
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const allCourses = useSelector(courseselectors.AllCourses);

  useEffect(() => {
    dispatch(courseActions.setActiveCourse({}));

    async function searchCourses() {
      try {
        const response = await api.get(
          `/search?search=${search}&page=${currentPage}`
        );
        setTotalPages(response.data.totalPages);
        dispatch(courseActions.SetCourses(response.data.courses));
      } catch (err) {
        console.log(err);
        setError("Erro ao buscar os cursos");
      }
    }
    searchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  function handleSingOut() {
    history.push("/sair");
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
      await api.delete(`/course/${course._id}`);
      history.go(0);
    } catch (error) {
      console.log(error);
      setError("Erro ao buscar os cursos");
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const response = await api.get(`/search?search=${search}&page=${1}`);
      setCurrentPage(1);
      setTotalPages(response.data.totalPages);
      dispatch(courseActions.SetCourses(response.data.courses));
      console.log(response);
    } catch (error) {
      console.log(error);
      setError("Erro ao buscar os cursos");
    }
  }

  return (
    <>
      <div className="main">
        <header>
          <h1>Cursos</h1>
          <button onClick={handleSingOut} className="leaveButton">
            Sair
          </button>
        </header>
        {error && <p>{error}</p>}
        <section className="mainActions">
          <button onClick={handleNewCourse} className="newCourse">
            Novo Curso
          </button>
          <form>
            <input
              type="text"
              placeholder="Digite aqui para pesquisar"
              onChange={e => setSearch(_.startCase(e.target.value))}
            />
            <input type="submit" value="Pesquisar" onClick={handleSearch} />
          </form>
        </section>
        <section className="content">
          {allCourses &&
            allCourses.map(course => (
              <div key={course._id} className="course">
                <Link
                  onClick={() => handleSetActiveCourse(course)}
                  to={`course/${course._id}`}
                >
                  <h3>{course.nome}</h3>
                  <h5>{course.categoria}</h5>
                  <p>{course.descricao}</p>
                </Link>
                <div className="courseActions">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="warning"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course)}
                    className="danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </section>
        <footer>
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
        </footer>
      </div>
    </>
  );
}
