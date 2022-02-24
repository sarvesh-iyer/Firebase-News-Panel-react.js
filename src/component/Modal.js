import { React, useRef, useCallback, useEffect } from "react";
import "./styles/Modal.css";
import deleteIcon from "./images/delete_icon.jpg";
import { EditNews } from "./pages/EditNews";
import { toast } from "react-toastify";

export const Modal = ({
  showModal,
  setShowModal,
  newsInfo,
  preview,
  deleteNews,
  targetButton,
}) => {
  const modalRef = useRef();

  //close modal when click outside
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  //close modal on ecs key press
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <div className="modal-background" ref={modalRef} onClick={closeModal}>
      <div
        className="modal-wrapper"
        style={
          targetButton === "edit"
            ? { width: "1200px", height: "fit-content" }
            : {}
        }
      >
        <span
          className="close"
          onClick={() => {
            setShowModal(false);
          }}
        >
          &#10006;
        </span>

        {targetButton === "preview" ? (
          <div className="preview-popup">
            <h2 className="preview-text">Preview</h2>
            <img src={preview} alt="" />
          </div>
        ) : null}

        {targetButton === "edit" ? (
          <EditNews
            setShowModal={setShowModal}
            editflag={targetButton}
            newsInfo={newsInfo}
          />
        ) : null}

        {targetButton === "delete" ? (
          <div className="delete-popup" style={{ textAlign: "center" }}>
            <img className="delete-icon" src={deleteIcon} alt="" />
            <h2>Are you sure?</h2>
            <p>
              Are you sure you want to delete this news? This process cannot be
              undone.
            </p>

            <button
              type="button"
              className="btn btn-secondary btn-size"
              style={{ marginRight: 15 }}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn btn-danger btn-size"
              onClick={() => {
                toast.success("News Deleted Successfully");
                deleteNews(newsInfo.newsid);
              }}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
