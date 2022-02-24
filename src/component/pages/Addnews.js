import { React, useState, useEffect, useRef } from "react";
import fireDB from "../../firebase";
import noimage from "./../images/No_image.jpg";
import "./../styles/Addnews.css";
import { Modal } from "../Modal";
import { toast } from "react-toastify";

export const Addnews = ({ setIsOpen }) => {
  const initialNewsValue = {
    title: "",
    desc: "",
    image: "",
    date: "",
  };

  const [newsValue, setNewsValue] = useState(initialNewsValue);

  const [localImageUrl, setlocaLImageUrl] = useState(null); //local image url
  const [imageUrl, setImageUrl] = useState(null); //firebase actual image url

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setlocaLImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  //for uploading the image
  const uploadImg = async (e) => {
    const imageObj = e.target.files[0];
    const imageRef = fireDB.storage().ref(`${"testing"}/${imageObj.name}`);
    await imageRef.put(imageObj);
    imageRef.getDownloadURL().then((url) => {
      setImageUrl(url);
    });
  };

  const date = new Date();
  const currentDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const inputHandler = (e) => {
    var { name, value } = e.target;
    setNewsValue({
      ...newsValue,
      [name]: value,
      image: imageUrl,
      date: currentDate,
    });
  };

  useEffect(() => {
    setNewsValue({
      ...newsValue,
      image: imageUrl,
      date: currentDate,
    });
  }, [imageUrl]);

  const submitHandler = (e) => {
    e.preventDefault();
    const database = fireDB.database().ref();
    database
      .child("contacts")
      .push(newsValue, (err) => {
        console.log(err);
      })
      .then(() => {
        toast.success("News Added Successfully");
        setNewsValue(initialNewsValue);
        setlocaLImageUrl(null);
      });
  };

  const reset = () => {
    setNewsValue(initialNewsValue);
    setlocaLImageUrl(null);
  };

  const [showModal, setShowModal] = useState(false);

  const [targetButton, setTargetButton] = useState(null);

  return (
    <div
      className="add-news"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <h1 className="heading">Add News Page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <div className={localImageUrl ? "container" : ""}>
            <img
              src={localImageUrl || noimage}
              alt="preview"
              className="preview-image"
            />
            <div className="middle">
              <div
                className="text"
                style={!localImageUrl ? { display: "none" } : {}}
                id="preview"
                onClick={(e) => {
                  setTargetButton(e.target.id);
                  setShowModal(true);
                }}
              >
                Click to View
              </div>
            </div>
          </div>

          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => {
              onImageChange(e);
              uploadImg(e);
            }}
          />
        </div>

        <div className="input-box" style={{ flex: 1 }}>
          <label htmlFor="title">News Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={newsValue.title}
            placeholder="News Title"
            onChange={inputHandler}
            required
          />

          <br />
          <label htmlFor="desc">Description</label>
          <textarea
            className="form-control"
            name="desc"
            value={newsValue.desc}
            rows="4"
            placeholder="Description"
            onChange={inputHandler}
            required
          ></textarea>
          <br />

          <div className="action-btn">
            <button
              type="reset"
              onClick={() => reset()}
              className="btn btn-primary"
            >
              Reset
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={imageUrl != null ? false : true}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      {showModal ? (
        <Modal
          preview={localImageUrl}
          showModal={showModal}
          setShowModal={setShowModal}
          targetButton={targetButton}
        />
      ) : null}
    </div>
  );
};
