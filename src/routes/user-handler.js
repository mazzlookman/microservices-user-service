import express from "express";
import userController from "../controller/user-controller.js";

export const userHandler = express.Router();

userHandler.post("/", userController.register);
userHandler.post("/login", userController.login);
userHandler.patch("/:id", userController.update);
userHandler.get("/:id", userController.getUser);
userHandler.get("/", userController.getUsers);