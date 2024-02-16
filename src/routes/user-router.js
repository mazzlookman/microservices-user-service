import express from "express";
import userController from "../controller/user-controller.js";

export const userRouter = express.Router();

userRouter.post("/", userController.register);
userRouter.post("/login", userController.login);
userRouter.patch("/:id", userController.update);
userRouter.get("/:id", userController.getUser);
userRouter.get("/", userController.getUsers);