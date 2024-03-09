import express from "express";
import logger from "morgan"
import {errorMiddleware} from "../middleware/error-middleware.js";
import {userRouter} from "../routes/user-router.js";
import {tokenRouter} from "../routes/token-router.js";

export const web = express();

web.use(logger(process.env.LOG_FORMAT));
web.use(express.json());
web.use(express.static("public"));

web.use("/api/users", userRouter);
web.use("/api/refresh-token", tokenRouter)

web.use(errorMiddleware);