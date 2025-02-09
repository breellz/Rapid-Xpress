import { User } from "../models/user"

export const createUserAccount = async (email: string, password: string) => {
  try {
    const user = await User.create({ email, password })
    return user
  } catch (error) {
    throw error
  }
}

