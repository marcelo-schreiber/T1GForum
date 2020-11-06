import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { FaAngleLeft, FaFolderPlus } from "react-icons/fa";

import "../../static/styles/auth/createPost.scss";
import { motion } from "framer-motion";

export default function CreatePost() {
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [section, setSection] = useState<string>("meme");
  const [image, setImage] = useState<File>();

  const handleSelectedImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const selectedImage = e.target.files[0];

    setImage(selectedImage);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (image && description.length > 3) {
      const data = new FormData();

      data.append("description", description);
      data.append("section", section);
      data.append("image", image);

      await fetch("http://localhost:8080/create-post", {
        method: "POST",
        headers: {
          token: localStorage.token,
        },
        body: data,
      });

      history.goBack();
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
          <FaFolderPlus size={24} />
        </label>
        <br />
        <input type="file" onChange={handleSelectedImage} name="image" id="image" />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.9 }}>
          Post
        </motion.button>
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
