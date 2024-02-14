import express from "express";
import userController from "../controller/user-controller.js";

export const userHandler = express.Router();

userHandler.post("/users", userController.register);