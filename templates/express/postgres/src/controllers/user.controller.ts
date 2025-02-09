import { sendErrorResponse, sendSuccessResponse } from "../middleware/error/responseHandler";
import { CustomRequest } from "../middleware/auth";
import { NextFunction, Response } from "express";
import AppError from "../middleware/error/errorHandler";
import sendEmail from '../services/email.service';
import datasource from "../db/db";
import { User } from "../entities/user.entity";


export const updateUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "password", "age"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return sendErrorResponse(res, "Invalid updates!", 400);
  }
  try {

    //handle update
    return sendSuccessResponse(res, "user updated successfully", 200, { user: req.user });
  } catch (error) {
    next(new AppError('Failed to update user', 500));
  }
}

export const deleteUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const userRepo = datasource.getRepository(User)
    await userRepo.remove(req.user!);
    //sendCancellationEmail
    await sendEmail(
      'account-deletion',
      {
        to: req.user!.email,
        subject: 'Account Deleted',
        message: `Your account has been deleted successfully`,
        html: `<p>Your account has been deleted successfully</p>`
      }
    )
    return sendSuccessResponse(res, "user deleted successfully", 200, { user: req.user });
  } catch (error) {
    next(new AppError('Failed to delete user', 500));
  }
}