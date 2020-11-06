import { pool } from "../config/db";
import { Request, Response } from "express";
import handleError from "../utils/errorResponse";
import { getCurrentDate } from "../utils/getCurrentDate";

export default {
  async createComment(req: Request, res: Response) {
    try {
      const date = getCurrentDate();
      const { comment_author, content, post_id } = req.body;

      const comment = await pool.query(
        "INSERT INTO comments (comment_author, content, date, post_id) VALUES ($1, $2, $3, $4)",
        [comment_author, content, date, post_id]
      );

      return res.status(201).json("Your comment was created");
    } catch (err) {
      console.error(err.message);
      handleError.handleServerError;
    }
  },

  async getPostAndComment(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

      const comments = await pool.query(
        "SELECT id, comment_author, content,date FROM comments WHERE post_id = $1",
        [id]
      );

      return res.status(200).json([post.rows[0], comments.rows]);
    } catch (err) {
      console.error(err.message);
      handleError.handleServerError;
    }
  },
};
