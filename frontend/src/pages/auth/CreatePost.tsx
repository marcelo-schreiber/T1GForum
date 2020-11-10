import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { FaAngleLeft, FaFolderPlus } from "react-icons/fa";
import { motion } from "framer-motion";

import ReactLoading from "react-loading";
import "../../static/styles/auth/createPost.scss";
import changeFolder from "../../static/images/change-image.png";

import { url } from "../../utils/apiUrl";

export default function CreatePost() {
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [section, setSection] = useState("meme");
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleSelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const selectedImage = e.target.files[0];

    setImage(selectedImage);

    const imagePreview = URL.createObjectURL(selectedImage);

    setPreviewImage(imagePreview);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      setIsloading(true);
      e.preventDefault();

      if (image && description.length > 3) {
        const data = new FormData();

        data.append("description", description);
        data.append("section", section);
        data.append("image", image);

        await fetch(`${url}/create-post`, {
          method: "POST",
          headers: {
            token: localStorage.token,
          },
          mode: "cors",
          body: data,
        })
          .then(x => x.json())
          .then(res =>
            res === "A post was created" ? history.goBack() : setIsloading(false)
          );
      }
      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      console.error(err.message);
    }
  };

  return (
    <div className="create-post-content">
      <button className="go-back" onClick={history.goBack}>
        <FaAngleLeft size={32} />
      </button>
      <form onSubmit={handleSubmit}>
        <h1>Create a post</h1>
        <label>make a description</label>
        <textarea
          id="description"
          minLength={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label>Choose a topic</label>
        <select value={section} onChange={e => setSection(e.target.value)}>
          <option>meme</option>
          <option>fenoxer</option>
          <option>anime</option>
          <option>art</option>
        </select>
        <label>Choose an image</label>
        <label htmlFor="image" className="image-selector">
          {previewImage.length > 0 ? (
            <div>
              <img
                src={changeFolder}
                alt="change-folder"
                width="24px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            <div style={{ paddingTop: "1rem" }}>
              <FaFolderPlus size={24} />
            </div>
          )}
        </label>
        <br />
        {previewImage.length > 0 && (
          <img
            src={previewImage}
            alt={previewImage}
            width="64px"
            style={{
              objectFit: "cover",
              maxHeight: "64px",
              border: "1px solid black",
              borderRadius: 5,
            }}
          />
        )}
        <br />
        <input type="file" onChange={handleSelectedImage} name="image" id="image" />
        {!isLoading ? (
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.9 }}>
            Post
          </motion.button>
        ) : (
          <div
            className="loading"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ReactLoading color="#5f7b23" type="spin" />
          </div>
        )}
      </form>
      <div className="instructions">
        <small>
          Having trouble making a post? send an email to{" "}
          <a href="mailto:t1gforumcontact@gmail.com">t1gforumcontact@gmail.com</a>
        </small>
      </div>
    </div>
  );
}
