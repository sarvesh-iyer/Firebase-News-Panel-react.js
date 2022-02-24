import { React, useState, useEffect } from "react";
import noimage from "./../images/No_image.jpg";
import fireDB from "../../firebase";
import { toast } from "react-toastify";

export const EditNews = ({ setShowModal, newsInfo }) => {
  const [editedNews, setEditedNews] = useState(newsInfo);
  const [localImageUrl, setlocaLImageUrl] = useState(newsInfo.image); //local image url

  const [imageUrl, setImageUrl] = useState(null); //firebase actual image url

  const date = new Date();
  const currentDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setlocaLImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  // for comparing newsInfo and edited news object
  const compareObj = () => {
    const newsInfoLength = Object.keys(newsInfo).length;
    const obj2Length = Object.keys(editedNews).length;
    if (newsInfoLength === obj2Length) {
      return Object.keys(newsInfo).every(
        (key) =>
          editedNews.hasOwnProperty(key) && editedNews[key] === newsInfo[key]
      );
    }
    return false;
  };

  const inputHandler = (e) => {
    var { name, value } = e.target;
    imageUrl != null
      ? setEditedNews({
          ...newsInfo,
          [name]: value,
          image: imageUrl,
          date: currentDate,
        })
      : setEditedNews({
          ...newsInfo,
          [name]: value,
          date: currentDate,
        });
  };

  useEffect(() => {
    imageUrl != null
      ? setEditedNews({
          ...newsInfo,
          image: imageUrl,
          date: currentDate,
        })
      : setEditedNews({
          ...newsInfo,
          date: currentDate,
        });
  }, [imageUrl]);

  //for uploading the image
  const uploadImg = async (e) => {
    const imageObj = e.target.files[0];
    const imageRef = fireDB.storage().ref(`${"testing"}/${imageObj.name}`);
    await imageRef.put(imageObj);
    imageRef.getDownloadURL().then((url) => {
      setImageUrl(url);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const database = fireDB.database().ref();
    database
      .child("contacts")
      .child(newsInfo.newsid)
      .update(editedNews)
      .then(() => {
        toast.success("News Updated Successfully");
        setShowModal(false);
      });
  };

  return (
    <div>
      <div className="edit-popup">
        <form onSubmit={submitHandler}>
          <div>
            <div style={{ flexGrow: 1 }}>
              <img
                className="preview-image"
                src={localImageUrl || noimage}
                alt="preview"
              />
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

          <div className="input-box" style={{ flexGrow: 1 }}>
            <label htmlFor="title">News Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={editedNews.title}
              placeholder="News Title"
              onChange={inputHandler}
              required
            />

            <br />
            <label htmlFor="desc">Description</label>
            <textarea
              className="form-control"
              name="desc"
              value={editedNews.desc}
              rows="6"
              placeholder="Description"
              onChange={inputHandler}
              required
            ></textarea>
            <br />

            <div className="action-btn">
              <button
                type="reset"
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={imageUrl == null && compareObj() ? true : false}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
