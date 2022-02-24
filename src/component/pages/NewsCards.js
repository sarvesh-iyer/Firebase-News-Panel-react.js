import { React, useState } from "react";
import "./../styles/NewsCard.css";
import fireDB from "../../firebase";
import { Modal } from "./../Modal";

export const NewsCards = (props) => {
  const news = {
    newsid: props.newsid,
    title: props.title,
    desc: props.desc,
    image: props.image,
    date: props.date,
    noimage: props.noimage,
  };

  const [isTruncated, setIsTruncated] = useState(true);
  const description = isTruncated ? news.desc.slice(0, 200) : news.desc;

  //show more toggler
  function toggleIsTruncate() {
    setIsTruncated(!isTruncated);
  }

  // firebase reference
  const database = fireDB.database().ref("contacts");

  //delete news function
  const deleteNews = (id) => {
    database.child(id).remove();
  };

  //To show modal
  const [showModal, setShowModal] = useState(false);

  const [targetButton, setTargetButton] = useState(null);

  return (
    <div className="newscard">
      <img
        src={news.image}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = news.noimage;
        }}
        alt={`${news.title}`}
      />
      <p className="date">{news.date}</p>
      <div style={{ flex: 1 }}>
        <h2>{news.title}</h2>
        <hr />
        <p style={{ textAlign: "justify" }}>
          {description}
          {news.desc.length > 200 ? (
            <span
              className="truncate-toggle"
              onClick={() => {
                toggleIsTruncate();
              }}
            >
              {isTruncated ? " Show More" : " Show Less"}
            </span>
          ) : (
            ""
          )}
        </p>
      </div>

      <div className="actions">
        <button
          type="button"
          id="edit"
          className="btn btn-primary"
          style={{ marginRight: "8px", marginBottom: "5px" }}
          onClick={(e) => {
            setTargetButton(e.target.id);
            setShowModal(true);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          id="delete"
          className="btn btn-danger"
          onClick={(e) => {
            setTargetButton(e.target.id);
            setShowModal(true);
          }}
        >
          Delete
        </button>
      </div>
      {showModal ? (
        <Modal
          newsInfo={news}
          showModal={showModal}
          setShowModal={setShowModal}
          preview={news.image}
          deleteNews={deleteNews}
          targetButton={targetButton}
        />
      ) : null}
    </div>
  );
};
