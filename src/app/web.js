import express from "express";
import logger from "morgan"
import {errorMiddleware} from "../middleware/error-middleware.js";
import {userHandler} from "../routes/user-handler.js";

export const web = express();

web.use(logger(process.env.LOG_FORMAT));
web.use(express.json());
web.use(express.static("public"));

web.use(userHandler);

web.use(errorMiddleware);