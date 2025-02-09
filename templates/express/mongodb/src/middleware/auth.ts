import * as jwt from 'jsonwebtoken'
import { User, IUser } from '../models/user'
import { Request, Response, NextFunction } from 'express'

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (error) {
    res.status(401).send({ error: "Authentication required" })
  }
}

export interface CustomRequest extends Request {
  user?: IUser;
  token?: string;
}

export const Auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, token } = await BaseAuth(req, res, next);
    req.user = user;
    req.token = token;
    next()
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "You are not authenticated" });
  }
};

export const BaseAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<{ user: IUser, token: string }> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new Error("no token was found");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  const user = await User.findOne({ _id: (decoded as any)._id })

  if (!user) {
    throw new Error("no user was found")
  }
  req.token = token
  req.user = user
  next()

  return { user, token };
};



