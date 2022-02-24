import React, { useState, useEffect } from "react";
import fireDB from "../../firebase";
import { NewsCards } from "./NewsCards";
import noimage from "./../images/No_image.jpg";

export const Viewnews = ({ setIsOpen }) => {
  const database = fireDB.database().ref();
  var [NewsList, setNewsList] = useState({});

  //always load the news
  useEffect(() => {
    database.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setNewsList({
          ...snapshot.val(),
        });
      } else {
        setNewsList({});
      }
    });
  }, []);

  return (
    <div
      className="view-news"
      style={{ flex: 1 }}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <h1 className="heading">View News Page</h1>
      {Object.keys(NewsList).map((id) => {
        return (
          <NewsCards
            key={id}
            newsid={id}
            title={NewsList[id].title}
            desc={NewsList[id].desc}
            image={NewsList[id].image}
            date={NewsList[id].date}
            noimage={noimage}
          />
        );
      })}
    </div>
  );
};
