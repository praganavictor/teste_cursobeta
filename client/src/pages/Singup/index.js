import React, { useState } from "react";
import { login, isAuthenticated } from "../../service/auth";
import { Link, useHistory } from "react-router-dom";
import api from "../../service/api";

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  async function handleSignUp(e) {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        const response = await api.post("/register", { email, senha });
        login(response.data.token);
        if (isAuthenticated()) history.push("/courses");
      } catch (err) {
        console.log(err);
        setError(
          "Houve um problema ao registrar sua conta, verifique suas credenciais. T.T"
        );
      }
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSignUp}>
          <span>Registrar</span>
          {error && <p>{error}</p>}
          <div>
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
            <button type="submit">Registrar</button>
            <hr />
            <Link to="/signin">Faça o login caso já tenha uma conta</Link>
          </div>
        </form>
      </div>
    </>
  );
}
