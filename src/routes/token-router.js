import express from "express";
import tokenController from "../controller/token-controller.js";

export const tokenRouter = express.Router()

tokenRouter.post("/", tokenController.create)
