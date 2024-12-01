import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { http } from "src/shared/axios-instance";
import Modal from "src/shared/Modal";
import Navbar from "src/shared/Navbar";
import Game from "./Game";

type TPost = {
  title: string;
  description: string;
  photo: string;
  reaction: number;
  id: number;
};

const tasks = [
  {
    photo: "/src/pages/tasks/cadr_million.png",
    title: "Кадр на миллион",
    reward: 20,
    description: "Сделать фото совместно с членами семьи.",
  },
  {
    photo: "/src/pages/tasks/hranitel_prirodi.png",
    title: "Хранитель природы",
    reward: 20,
    description: "Убирайте парк/улицу регулярно.",
  },
  {
    photo: "/src/pages/tasks/drug_hvostatih.png",
    title: "Друг хвостатых",
    reward: 110,
    description: "Помогите местному приюту: принесите еду или прогуляйтесь",
  },
];

const doneTasks = [
  {
    photo: "/src/pages/tasks/done-task2.jpg",
    title: "Чистый город",
  },
  {
    photo: "/src/pages/tasks/done-task1.jpg",
    title: "Дари тепло!",
  },
  {
    photo: "/src/pages/tasks/done-task3.jpg",
    title: "Чистый берег",
  },
];

const Main = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await http.get("/tape");

      setPosts(data);
    })();
  }, []);

  const [activePost, setActivePost] = useState<TPost | null>(null);

  const handleClickPost = (post: TPost) => {
    setActivePost(post);
  };

  return (
    <div className="mainhome">
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <h1 className="main__title">Главная</h1>
              {activePost && (
                <Modal
                  title={activePost.title}
                  onClick={() => {
                    setActivePost(null);
                  }}
                  BackgroundImage={
                    <img className="modal__image" src={activePost.photo} />
                  }
                >
                  <p className="modal__description">{activePost.description}</p>
                </Modal>
              )}
              <div className="tape__list">
                {posts.map((post: TPost) => (
                  <div
                    key={post.id}
                    className="tape__item"
                    onClick={() => handleClickPost(post)}
                  >
                    <img src={post.photo} alt={post.title} />
                    <strong className="tape__item-title">{post.title}</strong>
                    <p></p>
                  </div>
                ))}
              </div>
            </>
          }
        />
        <Route
          path="/tasks"
          element={
            <>
              <h1 className="main__title main__title_tasks">Задания</h1>
              {activePost && (
                <Modal
                  title={activePost.title}
                  onClick={() => {
                    setActivePost(null);
                  }}
                  BackgroundImage={
                    <img className="modal__image" src={activePost.photo} />
                  }
                >
                  <p className="modal__description">{activePost.description}</p>
                </Modal>
              )}
              <div className="tape__list">
                {tasks.map((task) => (
                  <div key={task.photo} className="task__item">
                    <img src={task.photo} alt={task.title} />
                    <div className="task__item__content">
                      <strong className="task__item-title">{task.title}</strong>
                      <span>Награда {task.reward}</span>
                      <p>{task.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h1 className="main__title main__title_tasks_done">
                Выполненные
              </h1>
              <div className="done__tasks">
                {doneTasks.map((task) => (
                  <div key={task.photo} className="doneTask">
                    <img src={task.photo} alt={task.title} />
                    <strong className="tape__item-title">{task.title}</strong>
                    <p></p>
                  </div>
                ))}
              </div>
            </>
          }
        />

        <Route path="/game" element={<Game />} />
      </Routes>

      <Navbar />
    </div>
  );
};

export default Main;
