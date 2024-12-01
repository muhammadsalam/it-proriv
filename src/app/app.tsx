import { FunctionComponent, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "pages/Home";
import Auth from "pages/Auth";
import Register from "pages/Register";
import Main from "pages/Main";
export const App: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 30);
  });

  if (isLoading)
    return (
      <div
        className="loader"
        style={{
          opacity: isLoading ? 1 : 0,
        }}
      >
        ВРЕМЯ ВМЕСТЕ
      </div>
    );

  return (
    <main className="main">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <>
                <Home />
                <Auth />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Home />
                <Register />
              </>
            }
          />
          <Route path="/main/*" element={<Main />} />
        </Routes>
      </Router>
    </main>
  );
};
