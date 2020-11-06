import { Router } from "express";

// middleware
import { upload } from "./config/uploadConfig";
import { validInfo } from "./middleware/validInfo";
import { validJwt } from "./middleware/validJwt";

// controllers
import instaController from "./controllers/postsController";
import authController from "./controllers/authController";
import commentControler from "./controllers/commentController";

export const router = Router();

router.get("/posts", instaController.getAllPosts);
router.get("/posts/:author", instaController.getUserPosts);
router.get("/posts/content/:id", commentControler.getPostAndComment);

router.post("/auth/register", validInfo, authController.registerUser);
router.post("/auth/login", validInfo, authController.loginUser);
router.post("/auth/verify", validJwt, authController.verifyUser);
router.post("/create-post", validJwt, upload.single("image"), instaController.postData); // 2 middlewares
router.post("/create-comment", validJwt, commentControler.createComment);

router.get("/username", validJwt, authController.getUsername);
