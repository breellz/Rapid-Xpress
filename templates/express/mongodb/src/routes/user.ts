import { deleteUser, updateUser } from "../controllers/user.controller";
import express from "express";
import { Auth } from "../middleware/auth";


export const userRouter = express.Router();


userRouter.post("/update", Auth, updateUser);


userRouter.delete("/user", Auth, deleteUser);
