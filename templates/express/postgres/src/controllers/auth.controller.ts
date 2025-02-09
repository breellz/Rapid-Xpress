import { NextFunction, Request, Response } from "express";
import AppError from "../middleware/error/errorHandler";
import { sendErrorResponse, sendSuccessResponse } from "../middleware/error/responseHandler";
import { createUser, findByCredentials } from "../services/auth.service";
import sendEmail from "../services/email.service";
import { loginValidation, signupValidation } from "../utils/validations/validation";


export const createUserAccount = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { error } = signupValidation({ email, password });
  if (error) {
    return sendErrorResponse(res, error.message, 400);
  }


  try {
    const user = await createUser(email, password);
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
  const { email, password } = req.body;

  const { error } = loginValidation({ email, password });
  if (error) {
    return sendErrorResponse(res, error.message, 400);
  }

  try {
    const user = await findByCredentials(
      email,
      password
    );
    const token = await user.generateAuthToken();
    return sendSuccessResponse(res, "user logged in successfully", 200, { user, token });
  } catch (error) {
    //pass error
    next(new AppError('Login failed', 500));
  }
}