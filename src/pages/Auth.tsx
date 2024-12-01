import { useState } from "react";
import { Link } from "react-router-dom";
import { useAllStore } from "src/entities/stores";
import { http } from "src/shared/axios-instance";
import Modal from "src/shared/Modal";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {
      const { data } = await http.post("/auth/login", {
        email,
        password,
      });
      useAllStore.setState({ token: data });
      localStorage.setItem("token", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal title="Вход">
      <label className="modal__input">
        <span>Почта</span>
        <input
          type="text"
          placeholder="vasya@pupkin.ru"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="modal__input">
        <span>Пароль</span>
        <input
          type="password"
          placeholder="*********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button className="modal__button" type="button" onClick={handleAuth}>
        Войти
      </button>

      <a href="#" className="modal__link">
        Забыли пароль
      </a>

      <Link className="modal__link__register" to="/register">
        Регистрация
      </Link>
    </Modal>
  );
};

export default Auth;
