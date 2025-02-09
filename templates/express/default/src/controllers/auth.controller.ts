import { CustomRequest } from "../middleware/auth";
import { NextFunction, Request, Response } from "express";
import { loginValidation, signupValidation } from "../utils/validations/validation";
import { User } from "../models/user";
import { sendErrorResponse, sendSuccessResponse } from "../middleware/error/responseHandler";
import AppError from "../middleware/error/errorHandler";
import sendEmail from "../services/email.service";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = signupValidation(req.body);
  if (error) {
    return sendErrorResponse(res, error.message, 400);
  }

  const user = new User(req.body);

  try {
    await user.save();
    // sendWelcomeEmail(user.email, user.name)
    await sendEmail(
      'welcome-mail',
      {
        to: user.email,
        subject: 'Welcome',
        message: `Welcome to our platform`,
        html: `<p>Welcome to our platform</p>`
      }
    )
    const token = await user.generateAuthToken();


    return sendSuccessResponse(res, "user created successfully", 201, { user, token });
  } catch (error) {
    next(new AppError('Failed to create user', 500));
  }
}

// login route with custom error handling

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return sendErrorResponse(res, error.message, 400);
  }

  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    return sendSuccessResponse(res, "user logged in successfully", 200, { user, token });
  } catch (error) {
    //pass error
    next(new AppError('Login failed', 500));
  }
}