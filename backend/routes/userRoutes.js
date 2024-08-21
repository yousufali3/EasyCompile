import express from "express";
import {
  login,
  logout,
  signup,
  userDetails,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
// import { getMyCodes } from "../controllers/compilerController";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.get("/user-details", verifyToken, userDetails);
// userRouter.get("/my-codes", verifyToken, getMyCodes);

export default userRouter;
