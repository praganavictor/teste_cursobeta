import React from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { courseselectors } from "../../store/selectors/courses";

export default function Course() {
  const history = useHistory();
  const activeCourse = useSelector(courseselectors.ActiveCourse);

  function handleBack() {
    history.push("/courses");
  }

  return (
    <>
      <div>
        <button onClick={handleBack}>voltar</button>
        <h1>Show</h1>
        <ReactPlayer url={activeCourse.link} />
        <p>{activeCourse.nome}</p>
        <p>{activeCourse.categoria}</p>
        <p>{activeCourse.descricao}</p>
      </div>
    </>
  );
}
