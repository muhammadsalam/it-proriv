import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({
  title,
  children,
  onClick,
  BackgroundImage,
}: {
  title: string;
  children: ReactNode;
  onClick?: Function;
  BackgroundImage?: JSX.Element;
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (!onClick) {
      return navigate("/");
    }

    onClick();
  };
  return (
    <>
      <div className="modal__background" onClick={handleBackClick}>
        {BackgroundImage && BackgroundImage}
      </div>
      <div className="modal">
        <h1 className="modal__title">{title}</h1>
        <div className="modal__block">{children}</div>
      </div>
    </>
  );
};

export default Modal;
