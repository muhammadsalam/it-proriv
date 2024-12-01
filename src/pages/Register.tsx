import { useState } from "react";
import { Link } from "react-router-dom";
import { useAllStore } from "src/entities/stores";
import { http } from "src/shared/axios-instance";
import Modal from "src/shared/Modal";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = async () => {
    const { data } = await http.post("/auth", {
      email,
      password,
      name,
      lastname: lastName,
    });

    useAllStore.setState({ token: data.token });
    localStorage.setItem("token", data.token);
  };

  return (
    <Modal title="Регистрация">
      <label className="modal__input">
        <span>Почта</span>
        <input
          spellCheck="false"
          type="text"
          placeholder="vasya@pupkin.ru"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="modal__input">
        <span>Пароль</span>
        <input
          spellCheck="false"
          type="password"
          placeholder="*********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div className="modal__inputs">
        <label className="modal__input">
          <span>Фамилия</span>
          <input
            spellCheck="false"
            type="text"
            placeholder="Даниялов"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="modal__input">
          <span>Имя</span>
          <input
            spellCheck="false"
            type="text"
            placeholder="Ибрагим"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <button className="modal__button" type="button" onClick={handleRegister}>
        Далее
      </button>

      <Link className="modal__link__register" to="/login">
        Уже есть аккаунт? Войти
      </Link>
    </Modal>
  );
};

export default Register;
