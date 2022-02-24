import React from "react";
import news_img from "./../images/news_img.gif";

export const Home = ({ setIsOpen }) => {
  return (
    <div
      className="Home"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div>
        <h1>Welcome to News Admin Panel</h1>
        <img src={news_img} alt="animated news globe" />
      </div>
    </div>
  );
};
