import "./Home.css";

import React from "react";

export const Home = () => {
  return (
    <div class="home">
      <div className="home__middle-box">
        <div className="home__text">Kiến thức là sức mạnh</div>
        <div className="home__btns">
          <a href="/library" className="home__read-now-btn">
            <span className="read-now-btn__text">Đọc ngay nào!!</span>
          </a>
        </div>
      </div>
    </div>
  );
};
