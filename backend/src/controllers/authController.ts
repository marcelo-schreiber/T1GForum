import { genSalt, hash, compare } from "bcrypt";
import { pool } from "../config/db";
import { jwtGenerator } from "../utils/jwtGenerator";
import { Request, Response } from "express";
import handleError from "../utils/errorResponse";

export default {
  async registerUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const salt = await genSalt(10); // level of encryption
      const bcryptedPassword = await hash(password, salt); // encryption

      const existingEmail = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      const existingUser = await pool.query("SELECT * FROM users WHERE name = $1", [
        name,
      ]);

      if (existingEmail.rows.length > 0) {
        // finds already existing email address
        return res.status(401).json("This email address is already used");
      }

      if (existingUser.rows.length > 0) {
        // finds already existing usernames
        return res.status(401).json("This username has already being taken");
      }

      let newUser = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, bcryptedPassword]
      );

      const jwtToken = jwtGenerator(newUser.rows[0].user_id); // generate JWT with user's uuid

      return res.json({ jwtToken }); // jwt token for navigation in the future
    } catch (err) {
      console.error(err.message);
      handleError.handleServerError;
    }
  },
  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if (user.rows.length === 0) {
        return res.status(401).json("Invalid Credentials");
      }

      const isPasswordValid = await compare(password, user.rows[0].password);

      if (!isPasswordValid) {
        return res.status(401).json("Invalid Credentials");
      }

      const jwtToken = jwtGenerator(user.rows[0].user_id); // generate JWT with user's uuid

      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      handleError.handleServerError;
    }
  },
  async verifyUser(req, res: Response) {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      handleError.handleServerError;
    }
  },
  async getUsername(req: any, res) {
    if (req.user) {
      const username = await pool.query("SELECT name FROM users WHERE user_id = $1", [
        req.user,
      ]);

      return res.status(200).json(username.rows[0]);
    }

    return res.status(500).json("Server Error");
  },
};
