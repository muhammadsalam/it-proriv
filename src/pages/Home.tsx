import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAllStore } from "src/entities/stores";

const Home = () => {
  const { token } = useAllStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/main");
    }
  }, [token]);

  return (
    <div className="home">
      <div className="index-top home__block">
        <img src="/src/pages/vremya-hands.png" alt="" />
        <h1 className="home__title">Время Вместе</h1>
      </div>

      <div className="buttons">
        <Link className="buttons__item" to="/login">
          Вход
        </Link>
        <Link className="buttons__item" to="/register">
          Регистрация
        </Link>
      </div>
    </div>
  );
};

export default Home;
