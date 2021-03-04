import React from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import "./show.css";

import { courseselectors } from "../../store/selectors/courses";

export default function Course() {
  const history = useHistory();
  const activeCourse = useSelector(courseselectors.ActiveCourse);

  function handleBack() {
    history.push("/courses");
  }

  return (
    <>
      <div className="show">
        <header>
          <h1>New</h1>
          <button onClick={handleBack}>Voltar</button>
        </header>
        <section className="video">
          <ReactPlayer url={activeCourse.link} />
          <article className="videoInfo">
            <h3>{activeCourse.nome}</h3>
            <p>Categoria: {activeCourse.categoria}</p>
            <p>
              Descrição: <p>{activeCourse.descricao}</p>
            </p>
          </article>
        </section>
      </div>
    </>
  );
}
