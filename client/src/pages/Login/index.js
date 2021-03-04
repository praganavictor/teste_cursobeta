import React, { useState } from "react";
import { login, isAuthenticated } from "../../service/auth";
import { Link, useHistory } from "react-router-dom";
import api from "../../service/api";

import "./main.css";

export default function SingIn() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleSignIn(e) {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        const response = await api.post("/authenticate", { email, senha });
        login(response.data.token);
        if (isAuthenticated()) history.push("/courses");
      } catch (err) {
        console.log(err);
        setError(
          "Houve um problema com o login, verifique suas credenciais. T.T"
        );
      }
    }
  }

  return (
    <>
      <div className="login">
        <h3>Login</h3>
        <form onSubmit={handleSignIn} className="formLogin">
          {error && <p>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <Link to="/signup">Criar conta</Link>
        </form>
      </div>
    </>
  );
}
