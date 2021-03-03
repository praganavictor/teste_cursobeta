import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import api from "../../service/api";
import { courseselectors } from "../../store/selectors/courses";

export default function NewCourse() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const activeCourse = useSelector(courseselectors.ActiveCourse);

  useEffect(() => {
    setNome(activeCourse.nome);
    setDescricao(activeCourse.descricao);
    setCategoria(activeCourse.categoria);
    setLink(activeCourse.link);
  }, [activeCourse]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      categoria: categoria.trim(),
      link: link.trim()
    };

    if (!nome.length) setError("Nome não foi preenchido");
    if (!descricao.length) setError("Descricao não foi preenchido");
    if (!categoria.length) setError("Categoria não foi preenchido");
    if (!link.length) setError("Link não foi preenchido");

    try {
      const response = api.put(`/course/${activeCourse._id}`, data);
      console.log(response);
      history.push("/courses");
    } catch (error) {
      console.log(error);
      setError("Não foi possivel cadastrar este curso");
    }
  }

  function handleBack() {
    history.push("/courses");
  }

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        <h1>Edit</h1>
        <button onClick={handleBack}>voltar</button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do Curso"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <textarea
            rows="3"
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Link do youtube"
            value={link}
            onChange={e => setLink(e.target.value)}
            required
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </>
  );
}
