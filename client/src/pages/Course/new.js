import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import api from "../../service/api";

import "./new.css";

export default function NewCourse() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      nome: _.startCase(nome.trim()),
      descricao: descricao.trim(),
      categoria: _.startCase(categoria.trim()),
      link: link.trim()
    };

    if (!nome.length) setError("Nome não foi preenchido");
    if (!descricao.length) setError("Descricao não foi preenchido");
    if (!categoria.length) setError("Categoria não foi preenchido");
    if (!link.length) setError("Link não foi preenchido");

    try {
      const response = api.post("/course", data);
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
      <div className="new">
        <header>
          <h1>New</h1>
          <button onClick={handleBack}>Voltar</button>
        </header>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do Curso"
            onChange={e => setNome(e.target.value)}
            required
          />
          <textarea
            rows="3"
            placeholder="Descrição"
            onChange={e => setDescricao(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Categoria"
            onChange={e => setCategoria(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Link do youtube"
            onChange={e => setLink(e.target.value)}
            required
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </>
  );
}
