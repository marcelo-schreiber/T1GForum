import { verify } from "jsonwebtoken";
import * as env from "dotenv";

env.config();

export const validJwt = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(403).json("Unauthorized");
  }

  try {
    const verification = verify(token, process.env.jwtSecret);
    req.user = verification.user; // set req.user to it's own user_id

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(400).json("Invalid credentials");
  }
};
