import { sign } from "jsonwebtoken";
import * as env from "dotenv";

env.config();

export const jwtGenerator = user_uuid => {
  const payload = {
    user: user_uuid,
  };

  return sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "1h" });
};
