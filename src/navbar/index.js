import React, { useState } from "react";

import style from "./style.module.css";

import Profile from "../img/profile.svg";
import Eye from "../img/eye.svg";
import Heart from "../img/heart.svg";
import Logo from "../img/logo.png";
import backgroundImage from "../img/backgroundmenu.jpg";

const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;

export default function Nav() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleIconClick = (content) => {
    setModalContent(content);
    setShowModal(true);

    if (content === "perfil") {
      setIsLogin(true);
      setMessage("");
      setName("");
      setEmail("");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
    setMessage("");
    setName("");
    setEmail("");
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setName("");
    setEmail("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
    if (emailExists) {
      setMessage("E-mail já cadastrado.");
      return;
    }

    const newUser = { name, email };
    setUsers([...users, newUser]);
    setMessage("Cadastro efetuado com sucesso! Faça o login.");

    setName("");
    setEmail("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setMessage("Por favor, preencha todos os campos.");
      return;
    }

    const user = users.find(
      (user) =>
        user.name.toLowerCase() === name.toLowerCase() &&
        user.email.toLowerCase() === email.toLowerCase()
    );
    if (user) {
      setCurrentUser(user);
      setMessage("Login bem-sucedido!");

      setTimeout(() => {
        handleCloseModal();
      }, 1000);
    } else {
      setMessage("Nome ou e-mail inválidos.");
    }
  };

  return (
    <div>
      <nav
        className={style.navbar}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 70, 0.8), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100%",
        }}
      >
        <img src={Logo} className={style.logo}></img>

        <ul className={style.list}>
          <li
            className={style.icon}
            onClick={() => handleIconClick("assistidos")}
          >
            <img
              className={style.watched}
              src={Eye}
              alt="Imagem de assistidos"
              title="Assistidos"
            />
            <p>Assistidos</p>
          </li>
          <li
            className={style.icon}
            onClick={() => handleIconClick("favoritos")}
          >
            <img
              className={style.heart}
              src={Heart}
              alt="Imagem de favoritos"
              title="Favoritos"
            />
            <p>Favoritos</p>
          </li>
          <li
            className={style.profile}
            onClick={() => handleIconClick("perfil")}
          >
            <img
              className={style.profileImg}
              src={Profile}
              alt="Imagem de perfil"
              title="Imagem de perfil"
            />
            {currentUser && (
              <div className={style.welcomeMessage}>
                <p>Bem-vindo, {currentUser.name.split(" ")[0]}!</p>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {showModal && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <button onClick={handleCloseModal} className={style.closeButton}>
              &times;
            </button>
            <h2>
              {modalContent === "assistidos"
                ? "Assistidos"
                : modalContent === "favoritos"
                ? "Favoritos"
                : "Perfil"}
            </h2>
            <p>Conteúdo do {modalContent} aqui.</p>

            {modalContent === "assistidos" && (
              <h1>Fazer maps para os selecionados dos Assistidos </h1>
            )}
            {modalContent === "favoritos" && (
              <h1>Fazer maps para os selecionados dos Favoritos </h1>
            )}
            {modalContent === "perfil" && (
              <div>
                <div className={style.authContainer}>
                  <h3>{isLogin ? "Login" : "Cadastro"}</h3>
                  <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    <div className={style.formGroup}>
                      <label htmlFor="name">Nome:</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className={style.formGroup}>
                      <label htmlFor="email">E-mail:</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className={style.submitButton}>
                      {isLogin ? "Acessar" : "Cadastrar"}
                    </button>
                  </form>
                  {message && <p className={style.message}>{message}</p>}
                  <p className={style.switchText}>
                    {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                    <span onClick={switchMode} className={style.switchLink}>
                      {isLogin ? "Cadastre-se" : "Faça login"}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
