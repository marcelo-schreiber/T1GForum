import { pool } from "../config/db";
import { Request, Response } from "express";
import handleError from "../utils/errorResponse";

export default {
  async getAllPosts(req, res: Response) {
    try {
      const posts = await pool.query("SELECT * FROM posts ORDER BY id DESC");

      return res.status(200).json(posts.rows);
    } catch (err) {
      console.error(err.message);
      handleError.handleServerError;
    }
  },
  async getSectionPosts(req: Request, res: Response) {
    try {
      const { section } = req.params;

      if (
        section === "fenoxer" ||
        section === "meme" ||
        section === "anime" ||
        section === "art"
      ) {
        const sectionPosts = await pool.query("SELECT * FROM posts WHERE section = $1", [
          section,
        ]);

        return res.status(200).json(sectionPosts.rows);
      }

      handleError.handleNotFound;
    } catch (err) {
      console.error(err.message);
      handleError.handleServerError;
    }
  },
  async getUserPosts(req: Request, res: Response) {
    try {
      const { author } = req.params;
      const userPosts = await pool.query("SELECT * FROM posts WHERE author = $1", [
        author,
      ]);

      return res.status(200).json(userPosts.rows);
    } catch (err) {
      console.error(err.message);
      handleError.handleServerError;
    }
  },
  async postData(req, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Bad request" });
      }

      const usernameQuery = await pool.query(
        "SELECT name FROM users WHERE user_id = $1",
        [req.user]
      );

      const username = usernameQuery.rows[0].name;
      const imageURL = `http://localhost:8080/uploads/${req.file.filename}`;
      const { description, section } = req.body;

      await pool.query(
        "INSERT INTO posts (author, image_path, description, section) VALUES ($1, $2, $3, $4)",
        [username, imageURL, description, section]
      );

      return res.status(201).json("A post was created");
    } catch (err) {
      console.error(err.message);
      handleError.handleServerError;
    }
  },
};
