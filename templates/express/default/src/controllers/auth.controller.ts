import { CustomRequest } from "../middleware/auth";
import { NextFunction, Request, Response } from "express";
import { loginValidation, signupValidation } from "../utils/validations/validation";
import { User } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  const { error } = signupValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return
  }

  const user = new User(req.body);

  try {
    await user.save();
    // sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken();

    res.status(201).send({ message: "user created successfully", data: { user, token } });
    return
  } catch (error) {
    res.status(500).send({ error: error.message });
    return
  }
}

// login route with custom error handling

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return
  }

  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ message: "login successful", data: { user, token } });
    return
  } catch (error) {
    //pass error
    next(error);
    return
  }
}