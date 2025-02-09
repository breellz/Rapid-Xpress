import { createAccountLimiter } from "../utils/rateLimiters";
import { createUserAccount, login } from "../controllers/auth.controller";
import { deleteUser, updateUser } from "../controllers/user.controller";
import express from "express"


export const authRouter = express.Router();

// sign up new users with rate limit
authRouter.post("/signup", createAccountLimiter, createUserAccount);

// login route with custom error handling

authRouter.post("/login", login);
